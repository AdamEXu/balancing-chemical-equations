# Stage 1: build the PhET sim. The build needs ~25 sibling phetsims repos checked out next to
# this one at pinned SHAs (see build-dependencies.json), so the workspace is /phet, not /app.
FROM node:22-bookworm AS sim
ENV PUPPETEER_SKIP_DOWNLOAD=1
WORKDIR /phet/balancing-chemical-equations
COPY package.json package-lock.json build-dependencies.json scripts-fetch-phet-deps.sh ./
RUN bash ./scripts-fetch-phet-deps.sh
COPY . .
RUN npx grunt --brands=adapted-from-phet

# Stage 2: the Flask app that serves the built sim behind Google sign-in.
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py docker-entrypoint.sh ./
COPY templates templates
COPY static static
COPY --from=sim /phet/balancing-chemical-equations/build/adapted-from-phet/balancing-chemical-equations_en_adapted-from-phet.html \
     build/adapted-from-phet/
ENV DATA_DIR=/data
VOLUME /data
EXPOSE 3002
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["gunicorn", "--bind", "0.0.0.0:3002", "--workers", "2", "app:app"]

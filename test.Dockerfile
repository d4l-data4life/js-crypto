
FROM selenium/standalone-chrome
# User must be set to root if you want to install something inside the selenium image
USER root


# Install node and npm
RUN apt-get update && apt-get install -y gnupg2 &&\
    curl -sL https://deb.nodesource.com/setup_10.x | bash - &&\
    apt-get install -y nodejs &&\
    npm install -g npm@latest


WORKDIR /crypto
COPY . .

RUN sudo chown -R nobody ~/.npm ~/.config /crypto

USER nobody

RUN node -v && npm -v

# Set required environment variables
ENV NODE_ENV dev
# Install dependencies and our test framework
RUN npm update && \
	npm install 

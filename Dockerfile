FROM node:23-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl unzip 
# Копируем проект
COPY . .
# Устанавливаем зависимости и билдим
RUN npm install --frozen-lockfile && npm run build
EXPOSE 3000
CMD ["npm", "start"]

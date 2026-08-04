import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'http://192.168.1.100:5173', "http://72.60.206.197:5173", "http://72.60.206.197:4173", "https://cosmo.chameleonitservices.com", "https://feedback.cosmohome.in"],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}
bootstrap();

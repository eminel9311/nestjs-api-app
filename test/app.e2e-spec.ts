import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { spec } from 'pactum';

/**
 * This is an example of an end-to-end test for the entire application.
 * 
 * How to run prisma studio on "TEST" database?
 * npx dotenv -e .env.test -- prisma studio
 * 
 * How to run prisma studio on "DEV" database?
 * npx dotenv -e .env -- prisma studio
 */
const PORT  = 3001;
const BASE_URL = `http://localhost:${PORT}`;
describe('App EndToEnd test', ()=>{
  let app: INestApplication;
  let prismaService: PrismaService;
  
  beforeAll(async ()=>{
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = appModule.createNestApplication()
    app.useGlobalPipes(new ValidationPipe());
    app.init();
    app.listen(PORT);
    prismaService = app.get<PrismaService>(PrismaService);
    prismaService.clearDatabase();

  })

  
  describe('Test Authentication', ()=>{
    describe('Test Register', ()=>{
      it('should Register a user', async () => {
        spec()
          .post(`${BASE_URL}/auth/register`)
          .withBody({
              email: 'test@gmail.com',
              password: 'password@123'
            })
          .expectStatus(201)
          .inspect()
      })
    })
  });

  afterAll(async ()=>{
    app.close();
  })

  it.todo('should PASS')
})

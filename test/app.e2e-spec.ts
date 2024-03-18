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
    // Register
    describe('Test Register', ()=>{
      it('should Register a user', async () => {
        await spec()
          .post(`${BASE_URL}/auth/register`)
          .withBody({
              email: 'test@gmail.com',
              password: 'password@123'
            })
          .expectStatus(201)
      })
    })

    describe('Register Error', ()=>{
      it('should show error with empty mail', async () => {
        await spec()
          .post(`${BASE_URL}/auth/register`)
          .withBody({
              email: '',
              password: 'password@123'
            })
          .expectStatus(400)
          .inspect()
      })
    })

    describe('Register Error', ()=>{
      it('should show error with empty password', async () => {
        await spec()
          .post(`${BASE_URL}/auth/register`)
          .withBody({
              email: 'test@gmail.com',
              password: ''
            })
          .expectStatus(400)
          .inspect()
      })
    })

    describe('Register Error', ()=>{
      it('should show error with invalid email format', async () => {
        await spec()
          .post(`${BASE_URL}/auth/register`)
          .withBody({
              email: 'aaaaa',
              password: 'abc@1234'
            })
          .expectStatus(400)
          .inspect()
      })
    })

    // Login
    describe('Test Login', ()=>{
      it('should Login success', async () => {
        await spec()
          .post(`${BASE_URL}/auth/login`)
          .withBody({
              email: 'test@gmail.com',
              password: 'password@123'
            })
          .expectStatus(201)
          .inspect()
          .stores('accessToken' , "accessToken")
      })
    })

    // Get detail user
    describe('Test User Detail', ()=>{
      it('should get detail user', async () => {
        await spec()
          .get(`${BASE_URL}/users/me`)
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}' //access to stored value
          })
          .expectStatus(200)
          .inspect()
      })
    })
    
    
  });

  afterAll(async ()=>{
    app.close();
  })

  it.todo('should PASS')
})

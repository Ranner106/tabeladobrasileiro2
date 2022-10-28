import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserService from '../services/UserService';



import { getbyEmailResult, invalidEmailLoginRequest, noEmailLoginRequest, noPasswordLoginRequest, validLoginRequest, validLoginResponse, wrongPasswordLoginRequest } from './mocks/login';
import httpStatus from '../utils/httpStatus';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
    describe('quando o email não é informado', () => {
        it('deve retornar um status 400 e a mensagem adequada', async () => {
            const httpResponse = await chai
        .request(app)
        .post('/login')
        .send(noEmailLoginRequest)
      expect(httpResponse.status).to.equal(httpStatus.badRequest)
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
        })
    });

    describe('quando o email não tem um formato válido', () => {
        it('deve retornar um status 401 e a mensagem adequada', async () => {
          const httpResponse = await chai
            .request(app)
            .post('/login')
            .send(invalidEmailLoginRequest)
    
          expect(httpResponse.status).to.equal(httpStatus.unauthorized)
          expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
        })
      });

      describe('quando o password não é informado', () => {
        it('deve retornar um status 400 e a mensagem adequada', async () => {
          const httpResponse = await chai
            .request(app)
            .post('/login')
            .send(noPasswordLoginRequest)
    
          expect(httpResponse.status).to.equal(httpStatus.badRequest)
          expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
        })
      });

      describe('quando o password informado está incorreto', () => {
        it('deve retornar um status 401 e a mensagem adequada', async () => {
          const httpResponse = await chai
            .request(app)
            .post('/login')
            .send(wrongPasswordLoginRequest)
    
          expect(httpResponse.status).to.equal(httpStatus.unauthorized)
          expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
        })
      });
    
      // describe('GET /login/validate', () => {
      //   beforeEach(sinon.restore);

      //   describe('quando é acessada com um token válido', () => {
      //     it('deve retornar um status 200 e a role do usuário logado', async () => {
      //       sinon.stub(UserService, "getRole").resolves('admin');
            
      //       const httpResponse = await chai
      //         .request(app)
      //         .get('/login/validate')
      //         .set('Authorization', validLoginResponse.token)
      
      //       expect(httpResponse.status).to.equal(httpStatus.ok)
      //       expect(httpResponse.body).to.deep.equal({ role: 'admin' })
      //     })
      //   });

      // });
});
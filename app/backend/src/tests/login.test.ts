import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';



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
});
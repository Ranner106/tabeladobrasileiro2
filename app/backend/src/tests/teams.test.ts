import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { getAllTeamsResponse } from './mocks/teams';
import httpStatus from '../utils/httpStatus';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
    beforeEach(sinon.restore);

    describe('em sua rota raiz', () => {
        it('deve retornar um status 200 e uma lista de times', async () => {
          sinon.stub(Team, "findAll").resolves(getAllTeamsResponse as Team[]);
          
          const httpResponse = await chai
            .request(app)
            .get('/teams')
    
          expect(httpResponse.status).to.equal(httpStatus.ok)
          expect(httpResponse.body).to.deep.equal(getAllTeamsResponse)
        })
      });

      describe('quando um id válido é informado', () => {
        it('deve retornar um status 200 e um time específico', async () => {
          sinon.stub(Team, "findOne").resolves(getAllTeamsResponse[0] as Team);
          
          const httpResponse = await chai
            .request(app)
            .get('/teams/1')
    
          expect(httpResponse.status).to.equal(httpStatus.ok)
          expect(httpResponse.body).to.deep.equal(getAllTeamsResponse[0])
        })
      });

      describe('quando um id inválido é informado', () => {
        it('deve retornar um status 404 e a mensagem adequada', async () => {
          sinon.stub(Team, "findOne").resolves(null);
          
          const httpResponse = await chai
            .request(app)
            .get('/teams/9999')
    
          expect(httpResponse.status).to.equal(httpStatus.notFound)
          expect(httpResponse.body).to.deep.equal({ message: 'Team not found' })
        })
      });
})


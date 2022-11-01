import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';

import { getMatches } from './mocks/match';
import httpStatus from '../utils/httpStatus';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
    it('deve retornar um status 200 e uma lista de partidas', async () => {
      sinon.stub(Match, "findAll").resolves(getMatches as Match[]);
      
      const httpResponse = await chai
        .request(app)
        .get('/matches')
  
      expect(httpResponse.status).to.equal(httpStatus.ok)
      expect(httpResponse.body).to.deep.equal(getMatches)
    });
  });
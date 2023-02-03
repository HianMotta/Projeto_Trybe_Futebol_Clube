import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { user, login, validToken } from './mocks/loginMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa os endpoints de login', () => {
  let HttpResponse: Response;

  describe('Testa casos de sucesso', () => {

    beforeEach(async () => {
      sinon
        .stub(User, "findOne")
        .resolves( user as User);
    });

    afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Login é feito com sucesso retornando o token', async () => {
      HttpResponse = await chai
      .request(app)
      .post('/login')
      .send(login)

      expect(HttpResponse.status).to.be.equal(200);
      expect(HttpResponse.body).to.have.property('token')
  })

    it('Retorna corretamente após a validação', async () => {
      HttpResponse = await chai
      .request(app)
      .post('/login/validate')
      .send({ 'Authorization': validToken })

      expect(HttpResponse.status).to.be.equal(200);
      expect(HttpResponse.body).to.deep.equal({ role: 'admin' });
    })
  
  describe('Testa casos de erro', () => {
    it('Usuário não fornece email', async () => {
      HttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'secret_admin'})

      expect(HttpResponse.status).to.be.equal(400);
      expect(HttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    })

    it('Usuário não fornece senha', async () => {
      HttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com'})
    
      expect(HttpResponse.status).to.be.equal(400);
      expect(HttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });

    })

    it('Usuário fornece email incorreto', async () => {
      HttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.co',
        password: 'secret_admin',
    })

    expect(HttpResponse.status).to.be.equal(401);
    expect(HttpResponse.body).to.deep.equal({ message: 'Incorrect email or password'});
    })

    it('Usuário fornece senha incorreta', async () => {
      HttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admi',
    })

    expect(HttpResponse.status).to.be.equal(401);
    expect(HttpResponse.body).to.deep.equal({ message: 'Incorrect email or password'});
    })
  })
})});

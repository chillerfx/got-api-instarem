const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.should();

chai.use(chaiHttp);

describe('Server', function() {

  it('should redirect on youtube trends', (done) => {
    chai.request(server)
      .get('/').redirects(0)
      .end(function(err, res){
        res.should.have.status(302);
        res.should.redirectTo('/youtube');
        done();
      });
  });

  it('should open /youtube', (done) => {
    chai.request(server)
      .get('/youtube')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('should redirect to trending video of country', (done) => {
    chai.request(server)
      .get('/youtube?country=LT')
      .end((err, res) => {
        res.should.have.status(200);
        //res.should.be.html()
        done()
      })
    it('should card with thubnail image', (done) => {
      chai.request(server) 
        .get('/youtube')
        .end((err, res) => {
          res.should.have.status(200);
          //res.should.be.html();
          /* @TODO add res body parsing to see if theres image*/
          done()
      });
    });  
  });
});


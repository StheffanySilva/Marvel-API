

describe('GET /characters', function (){
   
    before(function(){
       // cy.back2ThePast()
        cy.setToken()
            
  })
    
    it('Deve retornar uma lista de personagens cadastrados', function (){
    
        cy.getCharacters().then(function(response){
        expect(response.status).to.eql(200)
        expect(response.body).to.be.a('array')
        expect(response.body.length).greaterThan(0)
        })
    })

})
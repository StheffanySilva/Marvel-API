

describe('POST /characters', function(){

    before(function(){
      cy.back2ThePast()
      cy.setToken()
          
})

    it('Deve cadastrar um personagem', function(){

       const character = {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['x-men, illuminatis'],
            active: true  
        }
        cy.postCharacter(character)
           .then(function(response){
            expect(response.status).to.eql(201)
            cy.log(response.body.character_id)
           expect(response.body.character_id.length).to.eql(24)
        })
       
    })

    context('Quando o personagem já existe', function(){
        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: ['vingadores, irmandade de mutantes'],
            active: true   
        }

        before(function(){
            cy.postCharacter(character).then(function(response){
               expect(response.status).to.eql(201)
               
           })
        })

        it('não deve cadastrar duplicado', function(){
            cy.postCharacter(character).then(function(response){
               expect(response.status).to.eql(400)
               expect(response.body.error).to.eql('Duplicate character')
               
           })
        })
    })
    context('Validar os campos obrigatórios', function(){
        it('Campos obrigatórios -  "Nome"', function(){
            const character = {
                alias: 'Professor X',
                team: ['x-men, illuminatis'],
                active: true
            }
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.be.equal(400);
                cy.log(response.body.validation.body.message)
                expect(response.body.validation.body.message).to.be.equal('\"name\" is required');
            })

        })

        it('Campos obrigatórios - "Alias"', function(){
            const character = {
                name: 'Charles Xavier',
                team: ['x-men, illuminatis'],
                active: true
            }

            cy.postCharacter(character).then(function(response){
                expect(response.status).to.be.equal(400);
                cy.log(response.body.validation.body.message)
                expect(response.body.validation.body.message).to.be.equal('\"alias\" is required');
            })

        })
        it('Campos obrigatórios - "Team"', function(){
            const character = {
                name: 'Charles Xavier',
                alias: 'Professor X',
                active: true
            }

            cy.postCharacter(character).then(function(response){
                expect(response.status).to.be.equal(400);
                cy.log(response.body.validation.body.message)
                expect(response.body.validation.body.message).to.be.equal('\"team\" is required');
            })

        })
        it('Campos obrigatórios - "Active"', function(){
            const character = {
                name: 'Charles Xavier',
                alias: 'Professor X',
                team: ['x-men, illuminatis']
            }

            cy.postCharacter(character).then(function(response){
                expect(response.status).to.be.equal(400);
                cy.log(response.body.validation.body.message)
                expect(response.body.validation.body.message).to.be.equal('\"active\" is required');
            })

        })
    })
})
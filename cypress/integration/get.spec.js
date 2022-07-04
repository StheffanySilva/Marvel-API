


describe('GET /characters', function () {

    const characters = [
        {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira',
            team: ['x-men'],
            active: true
        },
        {
            name: 'Anna Marie LeBeau',
            alias: 'Vampira',
            team: ['x-men'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['novos vingadores'],
            active: true
        }
    ]

    before(function () {
        cy.populateCharacters(characters)
    })

    it('Deve retornar uma lista de personagens cadastrados', function () {
        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })
    })
    it('Deve buscar personagem por nome', function () {
        cy.searchCharacters('Anna Marie LeBeau').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Vampira')
            expect(response.body[0].team).to.eql(['x-men'])
            expect(response.body[0].active).to.eql(true)
        })
    })
})

describe('GET /characters/id', function () {

    const tonyStark = {
        name: 'Tony Stark',
        alias: 'Homem de Ferro',
        team: ['Vingadores'],
        active: true

    }

    context('Quando tenho um personagem cadastrado', function () {

        before(function () {
            cy.postCharacter(tonyStark).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })

        })
        it('Deve buscar o personagem pelo id', function () {
            const id = Cypress.env('characterId')
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Homem de Ferro')
                expect(response.body.team).to.eql(['Vingadores'])
                expect(response.body.active).to.eql(true)
            })
        })
    })
    it('Deve retornar 404 ao buscar por id não cadastrado', function () {
        const id = '62c1e9f875fba2047704a22b'
        cy.getCharactersById(id).then(function (response) {
            expect(response.status).to.eql(404)

        })
    })
})
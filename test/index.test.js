import app  from "../src/app.js"
import request from 'supertest'

//Comento tipo de peticion y ruta de las pruebas
describe('GET "/tasks"', ()=>{

    // Resultado esperado de una peticion simple sin info, status code 200 OK
    test('Deberia responder con un codigo de estado 200', async ()=>{
        const response = await request(app).get('/tasks').send()
        expect(response.statusCode).toBe(200)
    })

    // Resultado esperado es un vector de datos
    test('Deberia responder con un arreglo', async ()=>{
        const response = await request(app).get('/tasks').send()
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('POST /tasks',()=>{
    //Debe responder con 400 cuando no se envie titulo, descripcion o se envie vacio
    describe('Pruebas ofreciendo titulo y description (HappyPath)',()=>{

        const newTask = {
            title: "nombre tarea",
            description: "descripcion tarea"
        }
        test('Deberia responder con codigo de estado 200', async ()=>{
            const response = await request(app).post('/tasks').send(newTask)
            expect(response.statusCode).toBe(200)
        })
    
        test('Deberia responder con content-type JSON', async()=>{
            const response = await request(app).post('/tasks').send(newTask)
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        })
    
        test('Deberia responder con un task y su ID generado', async()=>{
            const response = await request(app).post('/tasks').send(newTask)
            expect(response.body.id).toBeDefined()
        })
    })
    
    //HACER QUE ESTA PRUEBA PASE - LEY DEL MINIMO ESFUERZO
    describe('Pruebas con body incompleto (SadPath)',()=>{
        test('Deberia responder 400 HTTP Code - Body VACIO', async()=>{
            const fields = [
                {},
                {title:"test"},
                {description:"test"}
            ]
            for (const body of fields){
                const response = await request(app).post('/tasks').send(body)
                expect(response.statusCode).toBe(400)
            }   
        })
    })
})
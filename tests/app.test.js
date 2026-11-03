const request = require('supertest');
const app = require('../src/app');

test('When GET /health is called, it should respond 200 and ok', async () => {
    const response = await request(app)
        .get('/health');

    expect(response.body).toEqual({ ok: true });
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
});

test('When POST /students is called with name Ada, it should respond 201 and trimmed name', async () => {
    const student = { name: ' Ada ' };

    const response = await request(app)
        .post('/students')
        .send(student);
        
    expect(response.body).toEqual({ name: 'Ada' });
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
});

test('When POST /students is called without a name, it should respond 400 and error message', async () => {
    const res = await request(app)
        .post('/students')
        .send({});

    expect(res.body).toEqual({
        error: 'name requis',
    });
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
});

test.each(['', '   ', 42, null])(
  'When POST /students is called with invalid name %p, it should respond 400 and error message', async (name) => {
    const res = await request(app)
      .post('/students')
      .send({ name });

    expect(res.body.error).toBe('name requis');
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
  },
);

test('When an unknown route is called, it should respond 404 and error message', async () => {
  const res = await request(app)
    .get('/absent');

  expect(res.body).toEqual({
    error: 'unknown route',
  });
  expect(res.status).toBe(404);
  expect(res.headers['content-type']).toMatch(/json/);
});


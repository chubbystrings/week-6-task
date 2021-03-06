"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
// async function deleteDataFromDb(ID: number | null, test: string):Promise<void> {
//   if (ID && test && test === 'post') {
//     await request(app).delete(`/api/v1/week-6-task/${ID}`);
//   }
// }
let ID = '';
// let postID: number | null = null;
// let test = '';
let preFilled = {};
let length = 0;
const data = {
    organization: 'beforeAll ninja',
    createdAt: new Date(),
    products: ['developers', 'pizza'],
    marketValue: '90%',
    address: 'sangotedo',
    ceo: 'cn',
    country: 'Taiwan',
    noOfEmployees: 2,
    employees: ['james bond', 'jackie chan'],
};
describe('create data / Update data', () => {
    it('should create a new organisation', async () => {
        data.organization = 'node ninja';
        const res = await supertest_1.default(app_1.default)
            .post('/api/v1/week-6-task')
            .send(data);
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('successful');
        expect(res.body.data).toHaveProperty('id');
        expect(typeof (res.body.data) === 'object').toBe(true);
        expect(res.body.data.organization).toBe('node ninja');
        ID = res.body.data.id;
        preFilled = {
            ...res.body.data,
        };
    });
    it('should update an organization', async () => {
        data.organization = 'edited ninja';
        const res = await supertest_1.default(app_1.default)
            .put(`/api/v1/week-6-task/${ID}`)
            .send(data);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('successful');
        expect(res.body.data).toHaveProperty('id');
        expect(typeof (res.body.data) === 'object').toBe(true);
        expect(res.body.data.id).toBe(ID);
        expect(res.body.data.organization).toBe('edited ninja');
        expect(res.body.data.updatedAt).not.toBe(null);
        preFilled = {
            ...res.body.data,
        };
    });
});
describe('fetch Data', () => {
    it('should fetch all organization', async () => {
        const res = await supertest_1.default(app_1.default)
            .get('/api/v1/week-6-task');
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('successful');
        expect(Array.isArray(res.body.data)).toBe(true);
        length = res.body.data.length;
    });
    it('should fetch a single organization', async () => {
        const res = await supertest_1.default(app_1.default)
            .get(`/api/v1/week-6-task/${ID}`);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('successful');
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toStrictEqual(preFilled);
        expect(typeof (res.body.data) === 'object').toBe(true);
    });
});
describe('Delete Data', () => {
    it('should delete an organization', async () => {
        const res = await supertest_1.default(app_1.default)
            .delete(`/api/v1/week-6-task/${ID}`);
        const resAll = await supertest_1.default(app_1.default).get('/api/v1/week-6-task');
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('successful');
        expect(resAll.body.data.length).toBe(length - 1);
    });
});
describe('return correct fetch data error', () => {
    it('should return an error id is invalid', async () => {
        const id = 'a';
        const res = await supertest_1.default(app_1.default)
            .get(`/api/v1/week-6-task/${id}`);
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('error');
        expect(res.body.message).toEqual('Please provide a valid id');
    });
    it('should return an error if id is unavailable', async () => {
        const res = await supertest_1.default(app_1.default)
            .get(`/api/v1/week-6-task/${ID}`);
        expect(res.status).toEqual(404);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toBe('error');
        expect(res.body.message).toBe('Not found');
    });
});
describe('Returns correct create data Error', () => {
    it('should return error if data is not complete or empty', async () => {
        const errorData = {
            ceo: 'emeka',
        };
        const res = await supertest_1.default(app_1.default)
            .post('/api/v1/week-6-task')
            .send(errorData);
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toBe('error');
        expect(res.body.message).toBe('Please provide valid data');
    });
});
describe('Returns correct Update Error', () => {
    it('should return error if id is not in database', async () => {
        const errorData = {
            ceo: 'emeka',
        };
        const res = await supertest_1.default(app_1.default)
            .put(`/api/v1/week-6-task/${ID}`)
            .send(errorData);
        expect(res.status).toEqual(404);
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toBe('error');
        expect(res.body.message).toBe('Not Found');
    });
});
describe('Returns correct Delete data Error', () => {
    it('should return error if id is not in database', async () => {
        const res = await supertest_1.default(app_1.default)
            .delete(`/api/v1/week-6-task/${ID}`);
        expect(res.status).toEqual(404);
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toBe('error');
        expect(res.body.message).toBe('Not Found');
    });
});

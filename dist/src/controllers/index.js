"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Organization {
    static async getOrganizations() {
        try {
            const buffer = await fs_1.default.promises.readFile('database.json');
            const allOrganizations = JSON.parse(buffer.toString());
            return allOrganizations;
        }
        catch (error) {
            return [];
        }
    }
    static async generateId() {
        const allOrganizations = await Organization.getOrganizations();
        let ID = 1;
        if (allOrganizations.length > 0) {
            const allIDs = allOrganizations.map((org) => org.id);
            const maxId = Math.max(...allIDs);
            ID = maxId + 1;
            return ID;
        }
        return ID;
    }
    static async saveToDb(organization) {
        try {
            const organizations = await Organization.getOrganizations();
            if (organizations.length > 0) {
                organizations.push(organization);
                const json = JSON.stringify(organizations, null, 2);
                await fs_1.default.promises.writeFile('database.json', json);
            }
            else {
                const data = [organization];
                const json = JSON.stringify(data, null, 2);
                await fs_1.default.promises.writeFile('database.json', json);
            }
        }
        catch (error) {
            throw new Error('could not save to database');
        }
    }
    static async findById(id) {
        const organizations = await Organization.getOrganizations();
        const org = organizations.find((or) => or.id === id);
        return org;
    }
    static async getAll(req, res) {
        try {
            const allOrg = await Organization.getOrganizations();
            return res.status(200).send({
                status: 'successful',
                data: allOrg,
            });
        }
        catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'An error occurred',
            });
        }
    }
    static async getOne(req, res) {
        try {
            if (!req.params || !Number(req.params.id)) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Please provide a valid id',
                });
            }
            const id = req.params.id ? Number(req.params.id) : 0;
            const org = await Organization.findById(id);
            if (!org) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Not found',
                });
            }
            return res.status(200).send({
                status: 'successful',
                data: org,
            });
        }
        catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'An error occurred',
            });
        }
    }
    static async createOne(req, res) {
        function check(data) {
            return !data.organization || !data.ceo
                || !data.address || !data.country || !data.marketValue
                || !data.products || !data.address || !data.noOfEmployees
                || !data.employees;
        }
        try {
            if (!req.body || check(req.body)) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Please provide valid data',
                });
            }
            const id = await Organization.generateId();
            const newData = {
                id,
                organization: req.body.organization,
                products: req.body.products,
                marketValue: req.body.marketValue,
                address: req.body.address,
                ceo: req.body.ceo,
                country: req.body.country,
                noOfEmployees: req.body.noOfEmployees,
                employees: req.body.employees,
                createdAt: new Date(),
                updatedAt: null,
            };
            await Organization.saveToDb(newData);
            return res.status(201).send({
                status: 'successful',
                data: newData,
            });
        }
        catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'An error occurred',
            });
        }
    }
    static async removeOne(req, res) {
        if (!req.params || !Number(req.params.id)) {
            return res.status(400).send({
                status: 'error',
                message: 'Please provide valid id',
            });
        }
        try {
            // const newId = await Organization.findById(id);
            const id = req.params.id ? Number(req.params.id) : 0;
            const orgs = await Organization.getOrganizations();
            const newOrg = orgs.filter((org) => org.id !== id);
            if (!newOrg) {
                return res.status(400).send({
                    status: 'Not Found',
                });
            }
            const json = JSON.stringify(newOrg, null, 2);
            await fs_1.default.promises.writeFile('database.json', json);
            return res.status(200).send({
                status: 'successful',
                message: 'successfully deleted',
            });
        }
        catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'An error occurred',
            });
        }
    }
    static async updateOne(req, res) {
        if (!req.body || !req.params || !Number(req.params.id)) {
            return res.status(400).send({
                status: 'error',
                message: 'Please provide valid id or data',
            });
        }
        const id = req.params.id ? Number(req.params.id) : 0;
        try {
            const org = await Organization.findById(id);
            if (!org) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Not Found',
                });
            }
            const newData = {
                ...org,
                ...req.body,
                updatedAt: new Date(),
            };
            const organizations = await Organization.getOrganizations();
            const index = organizations.findIndex((d) => d.id === id);
            organizations.splice(index, 1, newData);
            const json = JSON.stringify(organizations, null, 2);
            await fs_1.default.promises.writeFile('database.json', json);
            return res.status(200).send({
                status: 'successful',
                message: 'successfully  updated',
                data: newData,
            });
        }
        catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'An error occurred',
            });
        }
    }
}
exports.default = Organization;

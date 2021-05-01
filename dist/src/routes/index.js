"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controllers/index"));
const router = express_1.default.Router();
router.get('/', index_1.default.getAll);
router.get('/:id', index_1.default.getOne);
router.post('/', index_1.default.createOne);
router.put('/:id', index_1.default.updateOne);
router.delete('/:id', index_1.default.removeOne);
exports.default = router;

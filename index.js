"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var admin = require("firebase-admin");
var firestore = admin.firestore();
var FieldValue = admin.firestore.FieldValue;
var increment = FieldValue.increment(1);
var decrement = FieldValue.increment(-1);
var cole = [''];
var subcole = [''];
var coleccion = function (colections) { return cole = colections; };
var subcoleccion = function (subcolections) { return subcole = subcolections; };
var obtenerDatosDocumento = function (num, documento) { return __awaiter(void 0, void 0, void 0, function () {
    var doc, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firestore
                        .collection("" + cole[num])
                        .doc("" + documento).get()];
            case 1:
                doc = _a.sent();
                data = doc.data();
                return [2 /*return*/, data];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/*      OBTENER UNA cole   */
var obtenerDatosSubcole = function (num, documento, num2) { return __awaiter(void 0, void 0, void 0, function () {
    var datos_cole_1, collection, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                datos_cole_1 = [];
                return [4 /*yield*/, firestore
                        .collection("" + cole[num])
                        .doc("" + documento)
                        .collection("" + subcole[num2]).get()];
            case 1:
                collection = _a.sent();
                collection.forEach(function (doc) {
                    var data = doc.data();
                    datos_cole_1.push(data);
                });
                return [2 /*return*/, datos_cole_1];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var agregarDocumento = function (num, documento) { return __awaiter(void 0, void 0, void 0, function () {
    var agregado, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firestore
                        .collection("" + cole[num])
                        .add(documento)];
            case 1:
                agregado = _a.sent();
                return [2 /*return*/, agregado];
            case 2:
                err_3 = _a.sent();
                console.error(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var agregarSubDocumento = function (num, documento, num2, subdocumento) { return __awaiter(void 0, void 0, void 0, function () {
    var agregado, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firestore
                        .collection("" + cole[num])
                        .doc("" + documento)
                        .collection("" + subcole[num2])
                        .add(subdocumento)];
            case 1:
                agregado = _a.sent();
                return [2 /*return*/, agregado];
            case 2:
                err_4 = _a.sent();
                console.error(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var CrearDocumento = function (num, documento, campos) { return __awaiter(void 0, void 0, void 0, function () {
    var agregado, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firestore
                        .collection("" + cole[num])
                        .doc("" + documento)
                        .set(campos)];
            case 1:
                agregado = _a.sent();
                return [2 /*return*/, agregado];
            case 2:
                err_5 = _a.sent();
                console.error(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var CrearSubDocumento = function (num, documento, num2, subdocumento, documentocreado) { return __awaiter(void 0, void 0, void 0, function () {
    var agregado, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firestore
                        .collection("" + cole[num])
                        .doc("" + documento)
                        .collection("" + subcole[num2])
                        .doc("" + subdocumento)
                        .set(documentocreado)];
            case 1:
                agregado = _a.sent();
                return [2 /*return*/, agregado];
            case 2:
                err_6 = _a.sent();
                console.error(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var actualizarDocumento = function (num, documento, actualizar) { return __awaiter(void 0, void 0, void 0, function () {
    var err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firestore
                        .collection("" + cole[num])
                        .doc("" + documento)
                        .update(actualizar)];
            case 1:
                _a.sent();
                console.log('actualizado!');
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                console.error(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var actualizarSubDocumento = function (num, documento, num2, subdocumento, actualizar) { return __awaiter(void 0, void 0, void 0, function () {
    var err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firestore.collection("" + cole[num])
                        .doc("" + documento)
                        .collection("" + subcole[num2])
                        .doc("" + subdocumento)
                        .update(actualizar)];
            case 1:
                _a.sent();
                console.log('actualizado!');
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                console.error(err_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var eliminarDocumento = function (num, uid) { return __awaiter(void 0, void 0, void 0, function () {
    var err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firestore.doc(cole[num] + "/" + uid)["delete"]()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_9 = _a.sent();
                console.error(err_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// AUMENTA ME GUSTA DE UN PROYECTO
var meGustaIncrementar = function (num, uid_proyecto, user_uid) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            firestore
                .collection("" + cole[num])
                .doc("" + uid_proyecto)
                .update({
                me_gusta_total: increment,
                users_likes: FieldValue.arrayUnion(user_uid)
            });
        }
        catch (err) {
            console.error(err);
        }
        return [2 /*return*/];
    });
}); };
// DIMINUYE ME GUSTA DE UN PROYECTO
var noMeGustaDecrementar = function (num, uid_proyecto, user_uid) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            firestore
                .collection("" + cole[num])
                .doc("" + uid_proyecto).update({
                me_gusta_total: decrement,
                users_likes: FieldValue.arrayRemove(user_uid)
            });
        }
        catch (err) {
            console.error(err);
        }
        return [2 /*return*/];
    });
}); };
module.exports = cole;
module.exports = subcole;
module.exports = meGustaIncrementar;
module.exports = noMeGustaDecrementar;
module.exports = actualizarDocumento;
module.exports = actualizarSubDocumento;
module.exports = agregarDocumento;
module.exports = agregarSubDocumento;
module.exports = CrearSubDocumento;
module.exports = CrearDocumento;
module.exports = eliminarDocumento;
module.exports = obtenerDatosDocumento;
module.exports = obtenerDatosSubcole;
module.exports = cole;
module.exports = subcole;

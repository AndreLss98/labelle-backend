const {
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType
} = require('graphql');

const Cliente = require('./../repositorys/cliente');
const Servico = require('./../repositorys/servico');
const Reserva = require('./../repositorys/reserva');
const Profissional = require('./../repositorys/profissional');
const ServicoReserva = require('./../repositorys/servico_reserva');

const cliente = new GraphQLObjectType({
    name: "Cliente",
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        email: {
            type: GraphQLString
        },
        senha: {
            type: GraphQLString
        },
        nome: {
            type: GraphQLString
        },
        img_perfil: {
            type: GraphQLString
        },
        reservas: {
            type: new GraphQLList(reserva),
            resolve({id}, _) {
                return Reserva.getAllByClienteId(id);
            }
        }
    })
});

const reserva = new GraphQLObjectType({
    name: "Reserva",
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        cliente_id: {
            type: GraphQLInt
        },
        profissional_id: {
            type: GraphQLInt
        },
        dia: {
            type: GraphQLInt
        },
        mes: {
            type: GraphQLInt
        },
        ano: {
            type: GraphQLInt
        },
        horario: {
            type: GraphQLString
        },
        servicos: {
            type: new GraphQLList(servicoReserva),
            resolve({id}, _) {
                return ServicoReserva.getAllByReserva(id);
            }
        }
    })
});

const servicoReserva = new GraphQLObjectType({
    name: "ServicoReserva",
    fields: () => ({
        pro_servico_id: {
            type: GraphQLInt
        },
        reserva_id: {
            type: GraphQLInt
        },
        valor_pago: {
            type: GraphQLFloat
        },
        tipo: {
            type: servico,
            resolve({ pro_servico_id }, _) {
                return Servico.getType(pro_servico_id);
            }
        }
    })
});

const profissional = new GraphQLObjectType({
    name: "Profissional",
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        email: {
            type: GraphQLString
        },
        senha: {
            type: GraphQLString
        },
        nome: {
            type: GraphQLString
        },
        img_perfil: {
            type: GraphQLString
        }
    })
});

const servico = new GraphQLObjectType({
    name: "Servico",
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        nome: {
            type: GraphQLString
        },
        icone_path: {
            type: GraphQLString
        }
    })
});

const profissionalServico = new GraphQLObjectType({
    name: "ProfissionalServico",
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        profissional_id: {
            type: GraphQLInt
        },
        servico_id: {
            type: GraphQLInt
        },
        valor: {
            type: GraphQLFloat
        },
        disponivel: {
            type: GraphQLBoolean
        }
    })
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            cliente: {
                type: cliente,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(_, args) {
                    return Cliente.getById(args.id);
                }
            },
            profissional: {
                type: profissional,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(_, args) {
                    return Profissional.getById(args.id);
                }
            },
            servico: {
                type: servico,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(_, args) {
                    return Servico.getById(args.id);
                }
            },
            servicos: {
                type: new GraphQLList(servico),
                resolve() {
                    return Servico.getAll();
                }
            }
        }
    })
});

module.exports = schema;
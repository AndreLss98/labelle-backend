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
        },
        profissional: {
            type: profissional,
            resolve({ profissional_id }, _) {
                return Profissional.getById(profissional_id);
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
        },
        local: {
            type: local,
            resolve({ id }, _) {
                return Profissional.getLocal(id);
            }
        },
        disponibilidade: {
            type: disponibilidade,
            resolve({ id }, _) {
                return Profissional.getDisponibilidade(id);
            }
        },
        servicos: {
            type: new GraphQLList(profissionalServico),
            resolve({ id }, _) {
                return Profissional.getAllServices(id);
            }
        }
    })
});

const disponibilidade = new GraphQLObjectType({
    name: "Disponibilidade",
    fields: () => ({
        profissional_id: {
            type: GraphQLInt
        },
        dias_semana: {
            type: GraphQLString
        },
        horario_inicio: {
            type: GraphQLString
        },
        horario_fim: {
            type: GraphQLString
        }
    })
});

const local = new GraphQLObjectType({
    name: "Local",
    fields: () => ({
        profissional_id: {
            type: GraphQLInt
        },
        cep: {
            type: GraphQLString
        },
        rua: {
            type: GraphQLString
        },
        setor: {
            type: GraphQLString
        },
        numero: {
            type: GraphQLInt
        },
        quadra: {
            type: GraphQLInt
        },
        cidade: {
            type: GraphQLString
        },
        estado: {
            type: GraphQLString
        },
        latitude: {
            type: GraphQLFloat
        },
        longitude: {
            type: GraphQLFloat
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
        },
        tipo: {
            type: servico,
            resolve({ servico_id }, _) {
                return Servico.getById(servico_id);
            }
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
            profissionais: {
                type: new GraphQLList(profissional),
                resolve() {
                    return Profissional.getAll();
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
            },
            reserva: {
                type: reserva,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(_, { id }) {
                    return Reserva.getById(id);
                }
            },
            reservas: {
                type: new GraphQLList(reserva),
                args: {
                    cliente_id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    mes: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    ano: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(_, args) {
                    return Reserva.getAllOfMonth(args.cliente_id, args.mes, args.ano);
                }
            }
        }
    })
});

module.exports = schema;
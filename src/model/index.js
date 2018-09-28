const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');
// const typeDefs = require('./schemas/schema');

const baseURL = `http://localhost:3004`;

const typeDefs = `
  type Query {
    products: [product]
    getProduct(id: Int!): product
    brands: [brand]
    getBrand(id: Int!): brand
    models: [model]
    getModel(id: Int!): model
    fuelTypes: [fuel]
    getFuelType(id: Int!): fuel
    engineTypes: [engine]
    getEngineType(id: Int!): engine
    gearboxes: [gearbox]
    getGearbox(id: Int!): gearbox
    colors: [color]
    getColor(id: Int!): color
    filters: [filter]
  }
  type product {
    id: Int
    brand: Int
    model: Int
    fuel: Int
    engine: Int
    gearbox: Int
    color: Int
    year: Int
    km: Int
    price: Int
    thumbnailUrl: String
  }
  type brand {
    id: Int
    type: String
  }
  type model {
    id: Int
    brandId: Int
    type: String
  }
  type fuel {
    id: Int
    type: String
  }
  type engine {
    id: Int
    type: String
  }
  type gearbox {
    id: Int
    type: String
  }
  type color {
    id: Int
    type: String
  }
  type filter {
    id: Int
    type: String
  }
`;

const resolvers = {
  Query: {
    products: (parent, args) => {
      return fetch(`${baseURL}/products`).then(res => res.json())
    },
    getProduct: (parent, args) => {
      return fetch(`${baseURL}/products/${args.id}`).then(res => res.json())
    },
    brands: (parent, args) => {
      return fetch(`${baseURL}/brands`).then(res => res.json())
    },
    getBrand: (parent, args) => {
      return fetch(`${baseURL}/brands/${args.id}`).then(res => res.json())
    },
    models: (parent, args) => {
      return fetch(`${baseURL}/models`).then(res => res.json())
    },
    getModel: (parent, args) => {
      return fetch(`${baseURL}/models/${args.id}`).then(res => res.json())
    },
    engineTypes: (parent, args) => {
      return fetch(`${baseURL}/engines`).then(res => res.json())
    },
    getEngineType: (parent, args) => {
      return fetch(`${baseURL}/engines/${args.id}`).then(res => res.json())
    },
    fuelTypes: (parent, args) => {
      return fetch(`${baseURL}/fuels`).then(res => res.json())
    },
    getFuelType: (parent, args) => {
      return fetch(`${baseURL}/fuels/${args.id}`).then(res => res.json())
    },
    gearboxes: (parent, args) => {
      return fetch(`${baseURL}/gearboxes`).then(res => res.json())
    },
    getGearbox: (parent, args) => {
      return fetch(`${baseURL}/gearboxes/${args.id}`).then(res => res.json())
    },
    colors: (parent, args) => {
      return fetch(`${baseURL}/colors`).then(res => res.json())
    },
    getColor: (parent, args) => {
      return fetch(`${baseURL}/colors/${args.id}`).then(res => res.json())
    },
    filters: (parent, args) => {
      return fetch(`${baseURL}/filters`).then(res => res.json())
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))

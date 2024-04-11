import Sequelize from 'sequelize'

import configDatabase from '../config/database'

import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'
import mongoose from 'mongoose'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(
      'postgresql://postgres:wxYxmCKOxIexHJWHjcfZnugosuAhQPys@monorail.proxy.rlwy.net:30518/railway',
    )
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:GCKCNJcaJfZFpTBslLpUNSyIQlzjmzUh@monorail.proxy.rlwy.net:22208',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
  }
}

export default new Database()

export default {
  port: process.env.PORT || 3000,
  database: process.env.DBURL || `mongodb://localhost:${process.env.DB_PORT || '27017'}/shop`, // no necessary default port
  databaseConfig: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  SECRET_TOKEN: 'token'
}

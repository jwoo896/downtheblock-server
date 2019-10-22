const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Song = mongoose.model('song');

const SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        url: { type: GraphQLString },
        user: {
            type: require('./user_type'),
            resolve(parentValue){
                return Song.findUser(parentValue.id);
            }
        }
    })
});

module.exports = SongType;
const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLBoolean } = graphql;
const SongType = require('../schema/song_type');
const User = mongoose.model('user');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        loggedIn: { type: GraphQLBoolean },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        alias: { type: GraphQLString },
        headliner: { type: SongType },
        songs: {
            type: new GraphQLList(SongType),
            resolve(parentValue){
                console.log(User.findSongs(parentValue.id));
                return User.findSongs(parentValue.id);
            }
        }
    })
});

module.exports = UserType;
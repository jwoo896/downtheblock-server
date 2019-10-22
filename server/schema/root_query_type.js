const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLList } = graphql;
const UserType = require('./user_type');
const User = mongoose.model('user');
const SongType = require('./song_type');
const Song = mongoose.model('song');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return User.findById(id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue){
                return User.find({});
            }
        },
        songs: {
            type: new GraphQLList(SongType),
            resolve(parentValue){
                return Song.find({});
            }
        }

    })
});

module.exports = RootQuery;
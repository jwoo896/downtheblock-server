const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: { type: String },
    url: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

SongSchema.statics.addSongToUser = function(id) {
    const User = mongoose.model('user');

    return this.findById(id) //'this' refers to SongSchema
        .then(song => { //instance of Song
            return User.findById(song.user) //Search UserSchema
                .then(user => { //instance of User
                    user.songs.push(song);
                    return user.save();
                });
        });
}

SongSchema.statics.findUser = function(id) {
    return this.findById(id)
        .populate('user')
        .then(song => song.user);
}

mongoose.model('song', SongSchema);
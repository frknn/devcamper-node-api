const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a course description']
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill level'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  scholarshipsAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  }
});

/* Static methods can be called directly from the object itself 
  they don't need an instance,
  besides they can't be called from instance */

// Static method for calculating average cost
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  // mongodb aggregate doc
  // https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId }
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: "$tuition" }
      }
    }
  ]);

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    })
  } catch (err) {
    console.error(err);
  }
}


// Call getAverageCost after save
CourseSchema.post('save', async function () {
  await this.constructor.getAverageCost(this.bootcamp)
});

// Call getAverageCost before remove
CourseSchema.pre('remove', async function () {
  await this.constructor.getAverageCost(this.bootcamp)
});

module.exports = mongoose.model('Course', CourseSchema);
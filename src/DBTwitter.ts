import { TweetCollection } from "../models/Tweet";
import { Tweet } from "../database/tweets";

class DBTwitter {
  async getTweets(): Promise<Tweet[]> {
    const tweets = await TweetCollection.find();
    return tweets;
  }

  async getNumberOfTweetsByLevel(params: { level: number }): Promise<number> {
    const tweets = await TweetCollection.find({ spam_level: params.level });
    return tweets.length;
  }

  async getNumberOfTweetsByLevelRange(params: {
    minLevel?: number;
    maxLevel?: number;
  }): Promise<number> {
    const tweets = await TweetCollection.find({
      spam_level: { $gte: params.minLevel, $lte: params.maxLevel },
    });
    return tweets.length;
  }

  async getTweetById(params: { id: number }): Promise<Tweet | null> {
    const tweet = await TweetCollection.findOne({ _id: params.id });
    return tweet;
  }
  async getNumberOfFemaleUsers(): Promise<number> {
    const tweets = await TweetCollection.find({ gender: "Female" });
    return tweets.length;
  }

  async getNumberOfMaleUsers(): Promise<number> {
    const tweets = await TweetCollection.find({ gender: "Male" });
    return tweets.length;
  }

  async deleteTweet(params: { id: number }): Promise<void> {
    await TweetCollection.deleteOne({ _id: params.id });
    return;
  }

  async addTweet(tweet: Tweet): Promise<void> {
    await TweetCollection.create(tweet);
    return;
  }

  async updateTweet(params: {
    _id: number;
    user_name?: string;
    gender?: string;
    tweet?: string;
    spam_level?: number;
  }) {
    const res = await TweetCollection.updateOne(
      { _id: params._id },
      { $set: params }
    );
    return res;
  }
}

export default DBTwitter;

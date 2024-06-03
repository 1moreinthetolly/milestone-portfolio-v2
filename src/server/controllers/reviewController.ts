import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Review from '../models/review';

// Get all reviews
export const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get a single review
export const getReview = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No review found' });
    return;
  }

  try {
    const review = await Review.findById(id);

    if (!review) {
      res.status(404).json({ error: 'No review found' });
      return;
    }

    res.status(200).json(review);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Create a new review
export const createReview = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, comments, starRating } = req.body;

  try {
    const newReview = await Review.create({ firstName, lastName, email, comments, starRating });
    res.status(201).json(newReview);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No review found' });
    return;
  }

  try {
    const review = await Review.findOneAndDelete({ _id: id });

    if (!review) {
      res.status(404).json({ error: 'No review found' });
      return;
    }

    res.status(200).json(review);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No review found' });
    return;
  }

  try {
    const review = await Review.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!review) {
      res.status(404).json({ error: 'No review found' });
      return;
    }

    res.status(200).json(review);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

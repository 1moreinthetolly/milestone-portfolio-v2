import Review from '../models/review.js'

//get all reviews
export const getReviews = async (req, res) => {
    const reviews = await Review.find({}).sort ({createdAt:-1})
    res.status(201).json(reviews)
}


//get a single review
export const getReview = async (req, res) => {
    const {id} = req.params

    const review = await Review.findById(id)

    if (!review){
        return res.status(404).json({error:'no review found'})
    }

    res.status(201).json(review)
}


//create new review
export const createReview = async (req, res) => {
    const { author, stars, email, content } = req.body;
        try {
        const newReview = await Review.create({ author, stars, email, content });
        res.status(201).json(newReview);
            } catch (error) {
        res.status(400).json({ error: error.message });
        }
    };
//delete a review

//update a review


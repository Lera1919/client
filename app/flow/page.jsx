"use client";
import Post from '../../components/post'


export default function Flow() {

    const posts = [{
        "id": '',
        "description": '',
        "createdAt": "2023-07-25T16:23:29",
        "images": [
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg ',
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg '

        ],
        "user": {
            'id': 7,
            'firstName': ''
        }

    },
    {
        "id": '',
        "description": '',
        "createdAt": "2023-07-25T16:23:29",
        "images": [
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg ',
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg '

        ],
        "user": {
            'id': 7,
            'firstName': ''
        }

    },
    {
        "id": '',
        "description": '',
        "createdAt": "2023-07-25T16:23:29",
        "images": [
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg ',
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg '

        ],
        "user": {
            'id': 7,
            'firstName': ''
        }

    },
    {
        "id": '',
        "description": '',
        "createdAt": "2023-07-25T16:23:29",
        "images": [
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg ',
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg '

        ],
        "user": {
            'id': 7,
            'firstName': ''
        }

    },
    {
        "id": '',
        "description": '',
        "createdAt": "2023-07-25T16:23:29",
        "images": [
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg ',
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg '

        ],
        "user": {
            'id': 7,
            'firstName': ''
        }

    },
    {
        "id": '',
        "description": '',
        "createdAt": "2023-07-25T16:23:29",
        "images": [
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg ',
            'https://instagram.lern.dev/storage/users/undefined/gallery/0fbeaf5e-d153-44d0-a7a7-d5c9b8b5ed4f.jpg '

        ],
        "user": {
            'id': 7,
            'firstName': ''
        }

    }]



    return (

        <div className='squareGrid2'>
            {posts.map(post=> <Post key={post.id} post={post}/>)}
        </div>

    )
}

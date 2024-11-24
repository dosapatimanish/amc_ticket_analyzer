import { notFound } from 'next/navigation';

// Simulated data source
const posts = [
  { id: '1', title: 'Post One', content: 'This is the content of Post One.' },
  { id: '2', title: 'Post Two', content: 'This is the content of Post Two.' },
];

export async function generateStaticParams() {
  // Pre-generate routes for these IDs
  return posts.map((post) => ({ id: post.id }));
}

export default function Post({ params }) {
  const { id } = params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    notFound(); // Trigger 404 for invalid IDs
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

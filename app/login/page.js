import clientPromise from '@/lib/mongodb';
import { redirect } from 'next/navigation';

export default async function Page({ searchParams }) {
  const handle = searchParams?.handle || "";
  let flag= false;

  if (handle) {
    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection("links");

    const item = await collection.findOne({ handle });
    if (item) {
      redirect(`/${handle}`);
    }
    else{
        flag= true;
    }
  }

  return (
    <form className='bg-[#000000] h-screen text-white flex flex-col justify-center items-center'>
      {flag && <div className='text-red-600'>Wrong Handle. Try Again</div>}

      <div className='text-3xl font-semibold'>Type your handle name</div>
      <input
        name="handle"
        className='mt-5 text-black p-2 rounded-md font-bold'
        type="text"
      />
      <button type="submit" className='bg-blue-700 mt-3 p-3 rounded-2xl'>Submit</button>
    </form>
  );
}

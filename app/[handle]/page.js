import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

// ✅ Server Action: Add Link
async function addLink(formData) {
  "use server";
  const handle = formData.get("handle");
  const linktext = formData.get("linktext");
  const link = formData.get("link");

  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  await collection.updateOne(
    { handle },
    { $push: { links: { linktext, link } } }
  );

  redirect(`/${handle}`);
}

// ✅ Server Action: Delete Link
async function deleteLink(formData) {
  "use server";
  const handle = formData.get("handle");
  const link = formData.get("link");

  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  await collection.updateOne(
    { handle },
    { $pull: { links: { link } } } // delete by link URL
  );

  redirect(`/${handle}`);
}

export default async function Page({ params }) {
  const handle =(await params).handle;
  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle });

  if (!item) redirect("/");

  return (
    <div className="flex flex-col min-h-screen bg-purple-400 items-center">
      <div className="meta flex flex-col items-center gap-3 mt-5">
        <img
          className="w-28 h-28 object-cover rounded-full"
          src={item.pic}
          alt=""
        />
        <span className="font-bold text-lg">{`@${handle}`}</span>
      </div>

      {/* ✅ Display Links with Delete Buttons */}
      <div className="links mt-5 flex flex-col items-center">
        {item.links.map(
          (e, ind) =>
            e.link && (
              <div key={ind} className="flex items-center gap-3 mt-3">
                <Link href={e.link}>
                  <button className="text-xl font-semibold bg-white w-48 py-2 rounded-full shadow-lg transition-transform duration-200 hover:scale-110">
                    {e.linktext}
                  </button>
                </Link>

                {/* ✅ Delete Form */}
                <form action={deleteLink} method="POST">
                  <input type="hidden" name="handle" value={handle} />
                  <input type="hidden" name="link" value={e.link} />
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </form>
              </div>
            )
        )}
      </div>

      {/* ✅ Add Link Form */}
      <form
        action={addLink}
        method="POST"
        className="mt-10 flex flex-col sm:flex-row items-center gap-2 w-full max-w-md px-4"
      >
        <input type="hidden" name="handle" value={handle} />
        <input
          type="text"
          name="linktext"
          placeholder="Link text"
          className="p-2 rounded-md w-full sm:w-auto"
          required
        />
        <input
          type="url"
          name="link"
          placeholder="Link URL"
          className="p-2 rounded-md w-full sm:w-auto"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          Add Link
        </button>
      </form>
    </div>
  );
}

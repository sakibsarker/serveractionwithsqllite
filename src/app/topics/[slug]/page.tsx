import { Button } from "@nextui-org/react";
import { db } from "@/db";
import PostCreateForm from "@/components/posts/post-create-form";

interface TopicsShowPageProps {
  params: {
    slug: string;
  };
}
export default async function TopicsShowPage({ params }: TopicsShowPageProps) {
  const { slug } = params;

  return (
    <div className="grid gird-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
      </div>

      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}

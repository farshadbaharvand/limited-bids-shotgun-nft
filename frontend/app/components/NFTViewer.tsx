'use client';
import Image from 'next/image';

export default function NFTViewer() {
  // Simple placeholder viewer — fetch tokenURI via MockNFT if desired
  return (
    <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center">
      <Image src="/placeholder.png" alt="NFT" width={200} height={200} />
    </div>
  );
}
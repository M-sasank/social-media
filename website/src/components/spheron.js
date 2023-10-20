import { SpheronClient, ProtocolEnum } from "@spheron/storage";
import dotenv from 'dotenv';

dotenv.config();

export async function spheron_upload(filePath,Bucket_name) {
    const token = process.env.SPHERON_STORAGE_KEY;
    console.log(token);
    const client = new SpheronClient({token});  
    let currentlyUploaded = 0;
    const { uploadId, bucketId, protocolLink, dynamicLinks } = await client.upload(
    filePath,
    {
        protocol: ProtocolEnum.IPFS,
        name: Bucket_name,
        onUploadInitiated: (uploadId) => {
        console.log(`Upload with id ${uploadId} started...`);
        },
        onChunkUploaded: (uploadedSize, totalSize) => {
        currentlyUploaded += uploadedSize;
        console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
        },
    }
    );
    console.log(`Upload with id ${uploadId} finished.`);
    const upload = await client.getUpload(uploadId);
    console.log("Returned by getUpload is this: ",upload.protocolLink+`/${upload.uploadDirectory[0].fileName}`);
}

await spheron_upload("D:/social-media/website/src/components/images/work.jpg", "Test");



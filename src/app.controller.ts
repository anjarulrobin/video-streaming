import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
  @Get('/video')
  geVideo(@Req() req: Request, @Res() res: Response) {
    console.log('Streaming video');
    const filePath = join(process.cwd(), 'video.mp4');
    const videoSize = statSync(filePath).size;

    const range = req.headers['range'];
    if (!range) {
      res.status(400).send("Requires Range header");
    }
    const CHUNK_SIZE = 1024 * 1024; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoFile = createReadStream(filePath, { start, end });
    // const videoFile = createReadStream(filePath, { highWaterMark: 1024 * 10 });
    videoFile.pipe(res);
  }
}

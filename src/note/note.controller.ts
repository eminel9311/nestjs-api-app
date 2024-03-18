import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';

@UseGuards(MyJwtGuard)
@Controller('notes')
export class NoteController {

  constructor(){
    
  }

  @Get()
  getNotes() {
    return 'This action returns all notes';
  }

  @Get()
  getNoteById() {

  }

  @Post()
  insertNote() {

  }

  @Patch()
  updateNoteById() {

  }

  @Delete()
  deleteNoteById() {

  }


}

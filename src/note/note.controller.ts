import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { NoteService } from './note.service';
import { GetUser } from '../auth/decorator';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';

@UseGuards(MyJwtGuard)
@Controller('notes')
export class NoteController {
  constructor(
    private noteService: NoteService
  ){}

  @Get()
  getNotes(@GetUser('id') userId: number ) {
    return this.noteService.getNotes(userId);
  }

  @Get(':id')
  getNoteById(@Param('id', ParseIntPipe) noteId: number) {
    return this.noteService.getNoteById(noteId)
  }

  @Post()
  insertNote(
    @GetUser('id') userId: number,
    @Body() insertNoteDto: InsertNoteDTO
    ) {
      return this.noteService.insertNote(userId, insertNoteDto)
  }

  @Patch(':id')
  updateNoteById(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() updateNoteDto: UpdateNoteDTO
  ) {
    return this.noteService.updateNoteById(noteId, updateNoteDto) 
  }

  @Delete(':id')
  deleteNoteById(
    @Param('id', ParseIntPipe) noteId: number
  ) {
    return this.noteService.deleteNoteById(noteId)
  }


}

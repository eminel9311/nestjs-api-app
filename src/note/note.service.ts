import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';

@Injectable()
export class NoteService {
  constructor(
    private prismaService: PrismaService
  ) {

  }
  async getNotes(userId: number) {
    const notes = await this.prismaService.note.findMany({
      where: {
        userId: userId,
        isActive: true
      }
    })
    return notes
  }

  async getNoteById(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: {
        id: noteId,
        isActive: true
      }
    });

    if(!note) {
      throw new ForbiddenException('Note not found');
    }

    return note;
  }

  async insertNote(
    userId: number, 
    insertNoteDto: InsertNoteDTO
  ) {
    const note = await this.prismaService.note.create({
      data: {
        ...insertNoteDto,
        isActive: true,
       userId
      }
    })
    return note;
  }

  async updateNoteById(
    noteId: number,
    updateNoteDto: UpdateNoteDTO
  ) {
    const note = await this.prismaService.note.findUnique({
      where: {
        id: noteId
      }
    })
    if(!note) {
      throw new ForbiddenException('Note not found');
    }
    const updatedNote = await this.prismaService.note.update({
      where: {
        id: noteId
      },
      data: {
        ...updateNoteDto
      }
    })
    return updatedNote;
  }

  async deleteNoteById(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: {
        id: noteId
      }
    })
    if(!note) {
      throw new ForbiddenException('Note not found');
    }
    const deletedNote = await this.prismaService.note.update({
      where: {
        id: noteId
      },
      data: {
        isActive: false
      }
    })
    return deletedNote;
  }

}

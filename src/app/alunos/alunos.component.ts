import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../alunos.service';
import { AlunoModel } from './aluno.model';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

  aluno: AlunoModel = new AlunoModel();
  alunos: Array<any> = new Array();

  constructor(private alunosService: AlunosService) { }

  ngOnInit() {
    this.listarAlunos();
  }

  atualizar(id: number) {
    this.alunosService.atualizarAluno(id, this.aluno).subscribe(aluno => {
      this.aluno = new AlunoModel();
      this.listarAlunos();
    }, err => {
      console.log('Erro ao cadastrar o aluno', err)
    })
  }

  remover(id: number) {
    this.alunosService.removerAluno(id).subscribe(aluno => {
      this.aluno = new AlunoModel();
      this.listarAlunos();
    }, err => {
      console.log('Erro ao cadastrar o aluno', err)
    })
  }

  cadastrar() {
    this.aluno.nome = this.aluno.nome.substr(0, 1).toLocaleUpperCase() + this.aluno.nome.substr(1).toLowerCase();
    console.log(this.aluno);
    this.alunosService.cadastrarAluno(this.aluno).subscribe(aluno => {
      this.aluno = new AlunoModel();
      this.listarAlunos();
    }, err => {
      console.log('Erro ao cadastrar o aluno', err)
    })
  }

  listarAlunos() {
    this.alunosService.listarAlunos().subscribe(alunos => {
      this.alunos = alunos;
    }, err => {
      console.log('Erro ao listar os alunos', err);
    })
  }

}

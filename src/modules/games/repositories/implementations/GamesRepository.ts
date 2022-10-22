import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Esse método deve receber parte do título de um jogo ou o título inteiro e retornar um ou mais 
    //jogos que derem match com a consulta. 
    //Se o método for chamado com o argumento `"or S"` e existir algum jogo com essa sequência de letras
    // no título, o retorno deve ser feito
    return this.repository
    .createQueryBuilder("games")
    .where("LOWER(games.title) LIKE LOWER(:title)", { title: `%${param}%` })
    .getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    //Esse método deve retornar uma contagem do total de games existentes no banco.
    // Deve ser usada raw query para essa consulta.
    //return this.repository.query("SELECT COUNT(*) FROM games"); 
    // Complete usando raw query
    return this.repository.query("SELECT COUNT(id) FROM games");
  }
  
  async findUsersByGameId(id: string): Promise<User[]> {
    //Esse método deve receber o `Id` de um game e retornar uma lista de todos os usuários 
    //que possuem o game do `Id` informado.
    return this.repository
    .createQueryBuilder()
    .relation(Game, "users")
    .of(id)
    .loadMany();
      // Complete usando query builder
  }
}

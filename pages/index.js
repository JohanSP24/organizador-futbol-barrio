import React, { useState, useEffect } from 'react';
import { Users, Calendar, Trophy, Plus, UserPlus, Shuffle, Clock, MapPin, Star } from 'lucide-react';

const SoccerOrganizer = () => {
  const [activeTab, setActiveTab] = useState('players');
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: '', skill: 5, position: 'Cualquiera' });
  const [newMatch, setNewMatch] = useState({ date: '', time: '', location: '' });

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlayers = localStorage.getItem('soccerPlayers');
      const savedMatches = localStorage.getItem('soccerMatches');
      
      if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
      if (savedMatches) setMatches(JSON.parse(savedMatches));
    }
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('soccerPlayers', JSON.stringify(players));
    }
  }, [players]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('soccerMatches', JSON.stringify(matches));
    }
  }, [matches]);

  const addPlayer = () => {
    if (newPlayer.name.trim()) {
      const player = {
        id: Date.now(),
        ...newPlayer,
        gamesPlayed: 0,
        wins: 0
      };
      setPlayers([...players, player]);
      setNewPlayer({ name: '', skill: 5, position: 'Cualquiera' });
    }
  };

  const removePlayer = (id) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const createBalancedTeams = (selectedPlayers) => {
    if (selectedPlayers.length < 2) return { team1: [], team2: [] };

    // Algoritmo simple de balanceo por habilidad
    const shuffled = [...selectedPlayers].sort(() => Math.random() - 0.5);
    const team1 = [];
    const team2 = [];
    
    shuffled.forEach((player, index) => {
      if (index % 2 === 0) {
        team1.push(player);
      } else {
        team2.push(player);
      }
    });

    // Balancear por habilidad total
    let team1Skill = team1.reduce((sum, p) => sum + p.skill, 0);
    let team2Skill = team2.reduce((sum, p) => sum + p.skill, 0);

    // Si hay mucha diferencia, intercambia jugadores
    if (Math.abs(team1Skill - team2Skill) > 3) {
      const strongerTeam = team1Skill > team2Skill ? team1 : team2;
      const weakerTeam = team1Skill > team2Skill ? team2 : team1;
      
      if (strongerTeam.length > 1 && weakerTeam.length > 1) {
        const strongestPlayer = strongerTeam.reduce((prev, curr) => 
          prev.skill > curr.skill ? prev : curr
        );
        const weakestPlayer = weakerTeam.reduce((prev, curr) => 
          prev.skill < curr.skill ? prev : curr
        );

        // Intercambiar si mejora el balance
        const newTeam1Skill = team1Skill - strongestPlayer.skill + weakestPlayer.skill;
        const newTeam2Skill = team2Skill - weakestPlayer.skill + strongestPlayer.skill;
        
        if (Math.abs(newTeam1Skill - newTeam2Skill) < Math.abs(team1Skill - team2Skill)) {
          if (team1Skill > team2Skill) {
            team1.splice(team1.indexOf(strongestPlayer), 1, weakestPlayer);
            team2.splice(team2.indexOf(weakestPlayer), 1, strongestPlayer);
          } else {
            team2.splice(team2.indexOf(strongestPlayer), 1, weakestPlayer);
            team1.splice(team1.indexOf(weakestPlayer), 1, strongestPlayer);
          }
        }
      }
    }

    return { team1, team2 };
  };

  const scheduleMatch = () => {
    if (newMatch.date && newMatch.time && newMatch.location && players.length >= 2) {
      const availablePlayers = players.filter(p => Math.random() > 0.3); // Simular disponibilidad
      const { team1, team2 } = createBalancedTeams(availablePlayers);
      
      const match = {
        id: Date.now(),
        ...newMatch,
        team1,
        team2,
        status: 'Programado',
        team1Score: 0,
        team2Score: 0
      };
      
      setMatches([...matches, match]);
      setNewMatch({ date: '', time: '', location: '' });
    }
  };

  const finishMatch = (matchId, team1Score, team2Score) => {
    setMatches(matches.map(match => {
      if (match.id === matchId) {
        // Actualizar estadísticas de jugadores
        const updatedPlayers = players.map(player => {
          const inTeam1 = match.team1.some(p => p.id === player.id);
          const inTeam2 = match.team2.some(p => p.id === player.id);
          
          if (inTeam1 || inTeam2) {
            const won = (inTeam1 && team1Score > team2Score) || (inTeam2 && team2Score > team1Score);
            return {
              ...player,
              gamesPlayed: player.gamesPlayed + 1,
              wins: player.wins + (won ? 1 : 0)
            };
          }
          return player;
        });
        setPlayers(updatedPlayers);
        
        return {
          ...match,
          team1Score: parseInt(team1Score),
          team2Score: parseInt(team2Score),
          status: 'Finalizado'
        };
      }
      return match;
    }));
  };

  const getPlayerStats = (player) => {
    const winRate = player.gamesPlayed > 0 ? ((player.wins / player.gamesPlayed) * 100).toFixed(1) : 0;
    return { ...player, winRate };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg mb-4">
            <Trophy className="text-yellow-500" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">⚽ Organizador de Fútbol</h1>
          </div>
          <p className="text-gray-600">Gestiona jugadores, crea equipos balanceados y programa partidos</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            {[
              { id: 'players', label: 'Jugadores', icon: Users },
              { id: 'matches', label: 'Partidos', icon: Calendar },
              { id: 'stats', label: 'Estadísticas', icon: Trophy }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium transition-colors ${
                  activeTab === id
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Jugadores Tab */}
        {activeTab === 'players' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Agregar Jugador */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <UserPlus className="text-green-600" size={24} />
                Agregar Jugador
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre del jugador"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Habilidad: {newPlayer.skill}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newPlayer.skill}
                    onChange={(e) => setNewPlayer({...newPlayer, skill: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Principiante</span>
                    <span>Profesional</span>
                  </div>
                </div>
                <select
                  value={newPlayer.position}
                  onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option>Cualquiera</option>
                  <option>Portero</option>
                  <option>Defensa</option>
                  <option>Mediocampo</option>
                  <option>Delantero</option>
                </select>
                <button
                  onClick={addPlayer}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Agregar Jugador
                </button>
              </div>
            </div>

            {/* Lista de Jugadores */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Jugadores Registrados ({players.length})
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {players.map(player => (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {player.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="text-yellow-500" size={14} />
                          <span>Habilidad: {player.skill}/10</span>
                          <span>• {player.position}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                {players.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No hay jugadores registrados aún
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Partidos Tab */}
        {activeTab === 'matches' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Programar Partido */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="text-blue-600" size={24} />
                Programar Partido
              </h2>
              <div className="space-y-4">
                <input
                  type="date"
                  value={newMatch.date}
                  onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  value={newMatch.time}
                  onChange={(e) => setNewMatch({...newMatch, time: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Ubicación (ej: Cancha del barrio)"
                  value={newMatch.location}
                  onChange={(e) => setNewMatch({...newMatch, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={scheduleMatch}
                  disabled={players.length < 2}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Shuffle size={20} />
                  Crear Partido con IA
                </button>
                {players.length < 2 && (
                  <p className="text-sm text-red-500 text-center">
                    Necesitas al menos 2 jugadores registrados
                  </p>
                )}
              </div>
            </div>

            {/* Lista de Partidos */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Partidos ({matches.length})
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {matches.map(match => (
                  <div key={match.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} />
                        <span>{match.date} a las {match.time}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        match.status === 'Programado' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {match.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin size={14} />
                      <span>{match.location}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <h4 className="font-medium text-blue-600 mb-2">Equipo Azul</h4>
                        <div className="space-y-1">
                          {match.team1.map(player => (
                            <div key={player.id} className="text-xs bg-blue-50 p-1 rounded">
                              {player.name} ({player.skill})
                            </div>
                          ))}
                        </div>
                        {match.status === 'Finalizado' && (
                          <div className="text-2xl font-bold text-blue-600 mt-2">
                            {match.team1Score}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <h4 className="font-medium text-red-600 mb-2">Equipo Rojo</h4>
                        <div className="space-y-1">
                          {match.team2.map(player => (
                            <div key={player.id} className="text-xs bg-red-50 p-1 rounded">
                              {player.name} ({player.skill})
                            </div>
                          ))}
                        </div>
                        {match.status === 'Finalizado' && (
                          <div className="text-2xl font-bold text-red-600 mt-2">
                            {match.team2Score}
                          </div>
                        )}
                      </div>
                    </div>

                    {match.status === 'Programado' && (
                      <div className="mt-3 flex gap-2">
                        <input
                          type="number"
                          min="0"
                          placeholder="Azul"
                          className="w-16 p-1 border rounded text-center"
                          id={`team1-${match.id}`}
                        />
                        <span className="flex items-center">-</span>
                        <input
                          type="number"
                          min="0"
                          placeholder="Rojo"
                          className="w-16 p-1 border rounded text-center"
                          id={`team2-${match.id}`}
                        />
                        <button
                          onClick={() => {
                            const score1 = document.getElementById(`team1-${match.id}`).value;
                            const score2 = document.getElementById(`team2-${match.id}`).value;
                            finishMatch(match.id, score1, score2);
                          }}
                          className="ml-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Finalizar
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {matches.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No hay partidos programados
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Estadísticas Tab */}
        {activeTab === 'stats' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-600" size={24} />
              Estadísticas de Jugadores
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Jugador</th>
                    <th className="text-center py-3 px-4">Partidos</th>
                    <th className="text-center py-3 px-4">Victorias</th>
                    <th className="text-center py-3 px-4">% Victorias</th>
                    <th className="text-center py-3 px-4">Habilidad</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map(player => {
                    const stats = getPlayerStats(player);
                    return (
                      <tr key={player.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {player.name.charAt(0)}
                            </div>
                            <span className="font-medium">{player.name}</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">{stats.gamesPlayed}</td>
                        <td className="text-center py-3 px-4">{stats.wins}</td>
                        <td className="text-center py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            stats.winRate >= 70 ? 'bg-green-100 text-green-700' :
                            stats.winRate >= 50 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {stats.winRate}%
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="text-yellow-500" size={16} />
                            <span>{stats.skill}/10</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {players.length === 0 && (
                <div className="text-center py-12">
                  <Trophy className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">No hay estadísticas disponibles</p>
                  <p className="text-sm text-gray-400">Agrega jugadores y juega partidos para ver las estadísticas</p>
                </div>
              )}
            </div>

            {matches.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Resumen General</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{matches.length}</div>
                    <div className="text-sm text-blue-700">Total Partidos</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {matches.filter(m => m.status === 'Finalizado').length}
                    </div>
                    <div className="text-sm text-green-700">Partidos Jugados</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{players.length}</div>
                    <div className="text-sm text-yellow-700">Jugadores Activos</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoccerOrganizer;
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const API_URL = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:5000/api';

const Admin = () => {

  // Password protection
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const ADMIN_PASSWORD = "champ2025";

  // Existing admin hooks and logic
  const [activeTab, setActiveTab] = useState<"teams" | "fixtures" | "results">("teams");
  const [teams, setTeams] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [fixturesSportFilter, setFixturesSportFilter] = useState<string>("all");
  const [fixturesSortOrder, setFixturesSortOrder] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();

  const SPORTS = [
    "Cricket","Football","Basketball","Volleyball","Swimming","Chess","Boxing","Athletics","Badminton"
  ];
  const [teamForm, setTeamForm] = useState({ name: "", sport: "", logo: "" });
  const [matchForm, setMatchForm] = useState({ sport: "", team1: "", team2: "", date: "", venue: "" });
  const [scoreForm, setScoreForm] = useState({ matchId: "", team1Score: 0, team2Score: 0 });
  const [editMatchId, setEditMatchId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ sport: "", team1: "", team2: "", date: "", venue: "" });

  useEffect(() => {
    if (isAuthenticated) {
      fetchTeams();
      fetchMatches();
    }
  }, [isAuthenticated]);

  const fetchTeams = async () => {
    try {
      const res = await fetch(`${API_URL}/teams`);
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await fetch(`${API_URL}/matches`);
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamForm)
      });
      if (res.ok) {
        toast({ title: "Success!", description: "Team added" });
        setTeamForm({ name: "", sport: "", logo: "" });
        fetchTeams();
      } else {
        const err = await res.json().catch(() => ({}));
        toast({ title: "Error", description: err.error || "Failed", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed", variant: "destructive" });
    }
  };

  const handleDeleteTeam = async (id: string) => {
    try {
      await fetch(`${API_URL}/teams/${id}`, { method: 'DELETE' });
      toast({ title: "Success!", description: "Team deleted" });
      fetchTeams();
    } catch (err) {
      toast({ title: "Error", description: "Failed", variant: "destructive" });
    }
  };

  const handleAddMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/matches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchForm)
      });
      if (res.ok) {
        toast({ title: "Success!", description: "Match added" });
        setMatchForm({ sport: "", team1: "", team2: "", date: "", venue: "" });
        fetchMatches();
      } else {
        const err = await res.json().catch(() => ({}));
        toast({ title: "Error", description: err.error || "Failed", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed", variant: "destructive" });
    }
  };

  const handleDeleteMatch = async (id: string) => {
    if (!confirm('Delete this fixture?')) return;
    try {
      const res = await fetch(`${API_URL}/matches/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Deleted', description: 'Fixture removed' });
        fetchMatches();
      } else {
        toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const startEditMatch = (m: any) => {
    setEditMatchId(m._id);
    setEditForm({
      sport: m.sport || '',
      team1: m.team1?.name || '',
      team2: m.team2?.name || '',
      date: m.date ? new Date(m.date).toISOString().slice(0,16) : '',
      venue: m.venue || ''
    });
  };

  const cancelEditMatch = () => {
    setEditMatchId(null);
    setEditForm({ sport: '', team1: '', team2: '', date: '', venue: '' });
  };

  const handleEditMatchChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditMatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editMatchId) return;
    try {
      const res = await fetch(`${API_URL}/matches/${editMatchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        toast({ title: 'Updated', description: 'Fixture updated' });
        setEditMatchId(null);
        fetchMatches();
      } else {
        toast({ title: 'Error', description: 'Failed to update', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to update', variant: 'destructive' });
    }
  };

  const handleUpdateScore = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/matches/${scoreForm.matchId}/score`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team1Score: Number(scoreForm.team1Score), team2Score: Number(scoreForm.team2Score) })
      });
      if (res.ok) {
        toast({ title: "Success!", description: "Score updated & stats calculated" });
        setScoreForm({ matchId: "", team1Score: 0, team2Score: 0 });
        fetchMatches();
        fetchTeams();
      } else {
        const err = await res.json().catch(() => ({}));
        toast({ title: "Error", description: err.error || "Failed", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed", variant: "destructive" });
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      toast({ title: "Incorrect password", description: "Access denied", variant: "destructive" });
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {!isAuthenticated ? (
        <section className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="bg-card rounded-xl shadow-md p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </div>
        </section>
      ) : (
        <>
          <section className="pt-32 pb-16 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] via-[hsl(var(--gradient-primary-mid))] to-[hsl(var(--gradient-primary-end))] text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl font-bold mb-4">Admin Dashboard</h1>
              <p className="text-xl opacity-90">Manage teams, fixtures, and match results</p>
            </div>
          </section>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex gap-4 mb-8 border-b border-border">
                <button onClick={() => setActiveTab("teams")} className={`px-6 py-3 font-semibold ${activeTab === "teams" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
                  Manage Teams
                </button>
                <button onClick={() => setActiveTab("fixtures")} className={`px-6 py-3 font-semibold ${activeTab === "fixtures" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
                  Add Fixtures
                </button>
                <button onClick={() => setActiveTab("results")} className={`px-6 py-3 font-semibold ${activeTab === "results" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
                  Update Results
                </button>
              </div>
              {/* ...existing code for tabs... */}
              {activeTab === "teams" && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-card rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Add Team</h2>
                    <form onSubmit={handleAddTeam} className="space-y-4">
                      <div><Label>Team Name *</Label><Input value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} required /></div>
                      <div>
                        <Label>Sport *</Label>
                        <select value={teamForm.sport} onChange={(e) => setTeamForm({ ...teamForm, sport: e.target.value })} className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background" required>
                          <option value="">Select Sport</option>
                          {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div><Label>Logo URL</Label><Input value={teamForm.logo} onChange={(e) => setTeamForm({ ...teamForm, logo: e.target.value })} /></div>
                      <Button type="submit" className="w-full">Add Team</Button>
                    </form>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Teams ({teams.length})</h2>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {teams.map((team) => (
                        <div key={team._id} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-bold">{team.name}</p>
                            <p className="text-sm text-muted-foreground">{team.sport} • W:{team.wins} L:{team.losses} D:{team.draws} • {team.points}pts</p>
                          </div>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteTeam(team._id)}>Delete</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "fixtures" && (
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-card rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Add Match Fixture</h2>
                    <form onSubmit={handleAddMatch} className="space-y-4">
                      <div>
                        <Label>Sport *</Label>
                        <select value={matchForm.sport} onChange={(e) => setMatchForm({ ...matchForm, sport: e.target.value })} className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background" required>
                          <option value="">Select Sport</option>
                          {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Team 1 Name *</Label>
                          <Input value={matchForm.team1} onChange={(e) => setMatchForm({ ...matchForm, team1: e.target.value })} placeholder="Enter team 1 name" required disabled={!matchForm.sport} />
                        </div>
                        <div>
                          <Label>Team 2 Name *</Label>
                          <Input value={matchForm.team2} onChange={(e) => setMatchForm({ ...matchForm, team2: e.target.value })} placeholder="Enter team 2 name" required disabled={!matchForm.sport} />
                        </div>
                      </div>
                      <div><Label>Date & Time *</Label><Input type="datetime-local" value={matchForm.date} onChange={(e) => setMatchForm({ ...matchForm, date: e.target.value })} required /></div>
                      <div><Label>Venue</Label><Input value={matchForm.venue} onChange={(e) => setMatchForm({ ...matchForm, venue: e.target.value })} /></div>
                      <Button type="submit" className="w-full">Add Match</Button>
                    </form>
                  </div>
                  <div className="bg-card rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Manage Fixtures</h2>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div>
                        <Label>Filter by sport</Label>
                        <select value={fixturesSportFilter} onChange={(e) => setFixturesSportFilter(e.target.value)} className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background">
                          <option value="all">All</option>
                          {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <Label>Sort by date</Label>
                        <select value={fixturesSortOrder} onChange={(e) => setFixturesSortOrder(e.target.value as any)} className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background">
                          <option value="desc">Latest first</option>
                          <option value="asc">Earliest first</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-4 max-h-[32rem] overflow-y-auto pr-1">
                      {matches.length === 0 ? (
                        <p className="text-muted-foreground">No fixtures available.</p>
                      ) : (
                        matches
                          .filter(m => fixturesSportFilter === 'all' ? true : m.sport === fixturesSportFilter)
                          .sort((a, b) => fixturesSortOrder === 'desc' ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map((m) => (
                          <div key={m._id} className="border-b pb-4">
                            {editMatchId === m._id ? (
                              <form onSubmit={handleEditMatchSubmit} className="space-y-3">
                                <div className="grid md:grid-cols-2 gap-3">
                                  <div>
                                    <Label>Sport</Label>
                                    <select name="sport" value={editForm.sport} onChange={handleEditMatchChange} className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background" required>
                                      <option value="">Select Sport</option>
                                      {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                  </div>
                                  <div>
                                    <Label>Date & Time</Label>
                                    <Input name="date" type="datetime-local" value={editForm.date} onChange={handleEditMatchChange} required />
                                  </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-3">
                                  <div>
                                    <Label>Team 1</Label>
                                    <Input name="team1" value={editForm.team1} onChange={handleEditMatchChange} required />
                                  </div>
                                  <div>
                                    <Label>Team 2</Label>
                                    <Input name="team2" value={editForm.team2} onChange={handleEditMatchChange} required />
                                  </div>
                                </div>
                                <div>
                                  <Label>Venue</Label>
                                  <Input name="venue" value={editForm.venue} onChange={handleEditMatchChange} />
                                </div>
                                <div className="flex gap-2">
                                  <Button type="submit">Save</Button>
                                  <Button type="button" variant="secondary" onClick={cancelEditMatch}>Cancel</Button>
                                </div>
                              </form>
                            ) : (
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-xs text-primary mb-1">{m.sport}</p>
                                  <p className="font-bold">{m.team1?.name} vs {m.team2?.name}</p>
                                  <p className="text-sm text-muted-foreground">{new Date(m.date).toLocaleString()}</p>
                                  {m.venue && <p className="text-sm text-muted-foreground">📍 {m.venue}</p>}
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="secondary" onClick={() => startEditMatch(m)}>Edit</Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleDeleteMatch(m._id)}>Delete</Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "results" && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-card rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Update Match Score</h2>
                    <form onSubmit={handleUpdateScore} className="space-y-4">
                      <div>
                        <Label>Select Match *</Label>
                        <select value={scoreForm.matchId} onChange={(e) => {
                          const match = matches.find(m => m._id === e.target.value);
                          setScoreForm({ matchId: e.target.value, team1Score: match?.team1Score || 0, team2Score: match?.team2Score || 0 });
                        }} className="w-full mt-1 px-4 py-2 border border-input rounded-lg bg-background" required>
                          <option value="">Select a match to update</option>
                          {matches.filter(m => m.status === 'scheduled').map(match => (
                            <option key={match._id} value={match._id}>
                              {match.team1?.name} vs {match.team2?.name} - {new Date(match.date).toLocaleDateString()}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><Label>Team 1 Score *</Label><Input type="number" value={scoreForm.team1Score} onChange={(e) => setScoreForm({ ...scoreForm, team1Score: Number(e.target.value) })} required /></div>
                        <div><Label>Team 2 Score *</Label><Input type="number" value={scoreForm.team2Score} onChange={(e) => setScoreForm({ ...scoreForm, team2Score: Number(e.target.value) })} required /></div>
                      </div>
                      <Button type="submit" className="w-full" disabled={!scoreForm.matchId}>Update Score</Button>
                    </form>
                  </div>
                  <div className="bg-card rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Results by Sport</h2>
                    <div className="space-y-6 max-h-96 overflow-y-auto">
                      {SPORTS.map(sport => {
                        const sportResults = matches.filter(m => m.sport === sport && m.status === 'completed');
                        return (
                          <div key={sport}>
                            <h3 className="text-lg font-bold mb-2 text-primary">{sport}</h3>
                            {sportResults.length === 0 ? (
                              <p className="text-muted-foreground text-sm mb-4">No results yet</p>
                            ) : (
                              <div className="space-y-2">
                                {sportResults.map(match => (
                                  <div key={match._id} className="border-b pb-2">
                                    <p className="font-bold">{match.team1?.name} vs {match.team2?.name}</p>
                                    <p className="text-sm text-muted-foreground">{new Date(match.date).toLocaleString()}</p>
                                    <p className="text-sm">Score: {match.team1Score} - {match.team2Score}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Admin;

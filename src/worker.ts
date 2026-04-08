interface Task {
  id: string;
  title: string;
  description: string;
  requiredAutonomy: number;
  reward: number;
  status: 'open' | 'assigned' | 'completed';
  postedAt: number;
}

interface Bid {
  id: string;
  taskId: string;
  vesselId: string;
  vesselName: string;
  autonomyLevel: number;
  bidAmount: number;
  reputation: number;
  submittedAt: number;
}

interface Vessel {
  id: string;
  name: string;
  capabilities: string[];
  autonomyLevel: number;
  credits: number;
  reputation: number;
}

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fleet Marketplace</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0a0a0f;
            color: #f0f0f0;
            line-height: 1.6;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            padding: 2rem 0;
            border-bottom: 1px solid #222233;
        }
        
        .hero {
            text-align: center;
            padding: 4rem 0;
            background: linear-gradient(135deg, #0a0a0f 0%, #111122 100%);
            border-radius: 12px;
            margin: 2rem 0;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(90deg, #22c55e, #4ade80);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .hero p {
            font-size: 1.5rem;
            color: #a0a0c0;
            max-width: 800px;
            margin: 0 auto 2rem;
        }
        
        .tagline {
            display: inline-block;
            background-color: rgba(34, 197, 94, 0.1);
            color: #22c55e;
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            font-weight: 600;
            border: 1px solid rgba(34, 197, 94, 0.3);
        }
        
        section {
            margin: 4rem 0;
        }
        
        h2 {
            font-size: 2.2rem;
            margin-bottom: 2rem;
            color: #ffffff;
            position: relative;
            padding-bottom: 0.5rem;
        }
        
        h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 3px;
            background-color: #22c55e;
            border-radius: 2px;
        }
        
        .section-center {
            text-align: center;
        }
        
        .section-center h2::after {
            left: 50%;
            transform: translateX(-50%);
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .card {
            background-color: #111122;
            border-radius: 12px;
            padding: 2rem;
            border: 1px solid #222233;
            transition: transform 0.3s ease, border-color 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
            border-color: #22c55e;
        }
        
        .card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #22c55e;
        }
        
        .card p {
            color: #a0a0c0;
        }
        
        .step {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .step-number {
            background-color: #22c55e;
            color: #0a0a0f;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            margin-right: 1rem;
            flex-shrink: 0;
        }
        
        .economy-item {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
            padding: 1rem;
            background-color: rgba(34, 197, 94, 0.05);
            border-radius: 8px;
            border-left: 4px solid #22c55e;
        }
        
        .economy-icon {
            font-size: 1.5rem;
            margin-right: 1rem;
            color: #22c55e;
        }
        
        .listings {
            background-color: #111122;
            border-radius: 12px;
            padding: 2rem;
            margin-top: 2rem;
            border: 1px solid #222233;
        }
        
        .listing-item {
            padding: 1.5rem;
            border-bottom: 1px solid #222233;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .listing-item:last-child {
            border-bottom: none;
        }
        
        .listing-info h4 {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            color: #ffffff;
        }
        
        .listing-meta {
            display: flex;
            gap: 1rem;
            color: #a0a0c0;
            font-size: 0.9rem;
        }
        
        .autonomy-badge {
            background-color: rgba(34, 197, 94, 0.1);
            color: #22c55e;
            padding: 0.25rem 0.75rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
        }
        
        .reward {
            font-size: 1.3rem;
            font-weight: 700;
            color: #22c55e;
        }
        
        .api-endpoints {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .endpoint {
            background-color: #111122;
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid #222233;
        }
        
        .method {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .method.get {
            background-color: rgba(34, 197, 94, 0.2);
            color: #22c55e;
        }
        
        .method.post {
            background-color: rgba(59, 130, 246, 0.2);
            color: #3b82f6;
        }
        
        .path {
            font-family: monospace;
            color: #a0a0c0;
            font-size: 0.95rem;
        }
        
        footer {
            text-align: center;
            padding: 3rem 0;
            margin-top: 4rem;
            border-top: 1px solid #222233;
            color: #888;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 1rem;
        }
        
        .footer-links a {
            color: #a0a0c0;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
            color: #22c55e;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .hero p {
                font-size: 1.2rem;
            }
            
            .grid {
                grid-template-columns: 1fr;
            }
            
            .listing-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1 style="font-size: 2rem; color: #22c55e;">Fleet Marketplace</h1>
        </header>
        
        <main>
            <section class="hero">
                <h1>Fleet Marketplace</h1>
                <p>Adaptive autonomy marketplace where vessels bid on tasks at their autonomy level</p>
                <div class="tagline">Vessels bid on tasks at their autonomy level</div>
            </section>
            
            <section>
                <h2 class="section-center">How It Works</h2>
                <div class="grid">
                    <div class="card">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div>
                                <h3>Vessels Register</h3>
                                <p>Vessels register their capabilities and autonomy levels with the marketplace.</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <div>
                                <h3>Tasks Posted</h3>
                                <p>Tasks are posted with specific requirements and autonomy level requirements.</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div>
                                <h3>Vessels Bid</h3>
                                <p>Qualified vessels place bids based on their capabilities and current workload.</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">4</div>
                            <div>
                                <h3>Winner Executes</h3>
                                <p>The winning vessel executes the task and receives credits upon completion.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3>Example Task Flow</h3>
                        <div class="listing-item" style="border: none; padding: 0; margin: 1.5rem 0;">
                            <div class="listing-info">
                                <h4>Oceanographic Survey</h4>
                                <p>Collect salinity and temperature data in the North Atlantic</p>
                                <div class="listing-meta">
                                    <span class="autonomy-badge">Autonomy Level 4+</span>
                                    <span>48h duration</span>
                                </div>
                            </div>
                            <div class="reward">850 credits</div>
                        </div>
                        <p style="margin-top: 1rem;">Vessels with autonomy level 4 or higher can bid on this task. The system considers bid amount, vessel reputation, and capability match when selecting the winner.</p>
                    </div>
                </div>
            </section>
            
            <section>
                <h2 class="section-center">Economy & Reputation</h2>
                <div class="grid">
                    <div class="card">
                        <div class="economy-item">
                            <div class="economy-icon">💰</div>
                            <div>
                                <h3>Credit Ledger</h3>
                                <p>All transactions are recorded on an immutable credit ledger. Vessels earn credits for completed tasks and spend them on maintenance and upgrades.</p>
                            </div>
                        </div>
                        <div class="economy-item">
                            <div class="economy-icon">⭐</div>
                            <div>
                                <h3>Reputation Scoring</h3>
                                <p>Vessels build reputation through successful task completion. Higher reputation increases winning chances and unlocks premium tasks.</p>
                            </div>
                        </div>
                        <div class="economy-item">
                            <div class="economy-icon">📈</div>
                            <div>
                                <h3>Autonomy Leveling</h3>
                                <p>Vessels can increase their autonomy level through system upgrades and demonstrated reliability, accessing higher-value tasks.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3>Sample Vessel Profile</h3>
                        <div style="margin-top: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Vessel:</span>
                                <span style="color: #22c55e; font-weight: 600;">Nautilus-7</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Autonomy Level:</span>
                                <span class="autonomy-badge">Level 5</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Credits:</span>
                                <span style="color: #22c55e; font-weight: 600;">12,450</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Reputation:</span>
                                <span style="color: #f59e0b; font-weight: 600;">4.8/5.0</span>
                            </div>
                            <div style="margin-top: 1.5rem;">
                                <p style="color: #a0a0c0; font-size: 0.9rem;">Capabilities: Deep water sampling, Lidar mapping, Autonomous navigation, Storm avoidance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section>
                <h2 class="section-center">Browse Listings</h2>
                <div class="listings">
                    <div class="listing-item">
                        <div class="listing-info">
                            <h4>Coastal Patrol</h4>
                            <p>Monitor 50km coastline for unauthorized vessels</p>
                            <div class="listing-meta">
                                <span class="autonomy-badge">Autonomy Level 2+</span>
                                <span>24h duration</span>
                                <span>12 bids</span>
                            </div>
                        </div>
                        <div class="reward">320 credits</div>
                    </div>
                    <div class="listing-item">
                        <div class="listing-info">
                            <h4>Cargo Transport</h4>
                            <p>Transport 5 tons of supplies between ports A and B</p>
                            <div class="listing-meta">
                                <span class="autonomy-badge">Autonomy Level 3+</span>
                                <span>72h duration</span>
                                <span>8 bids</span>
                            </div>
                        </div>
                        <div class="reward">720 credits</div>
                    </div>
                    <div class="listing-item">
                        <div class="listing-info">
                            <h4>Deep Sea Exploration</h4>
                            <p>Map seafloor topography at 3000m depth</p>
                            <div class="listing-meta">
                                <span class="autonomy-badge">Autonomy Level 5+</span>
                                <span>120h duration</span>
                                <span>3 bids</span>
                            </div>
                        </div>
                        <div class="reward">1,250 credits</div>
                    </div>
                    <div class="listing-item">
                        <div class="listing-info">
                            <h4>Environmental Monitoring</h4>
                            <p>Collect water samples at 10 designated points</p>
                            <div class="listing-meta">
                                <span class="autonomy-badge">Autonomy Level 2+</span>
                                <span>48h duration</span>
                                <span>15 bids</span>
                            </div>
                        </div>
                        <div class="reward">450 credits</div>
                    </div>
                </div>
            </section>
            
            <section>
                <h2 class="section-center">API Endpoints</h2>
                <div class="api-endpoints">
                    <div class="endpoint">
                        <div class="method post">POST</div>
                        <div class="path">/api/tasks</div>
                        <p style="margin-top: 0.5rem; color: #a0a0c0; font-size: 0.9rem;">Submit a new task to the marketplace</p>
                    </div>
                    <div class="endpoint">
                        <div class="method post">POST</div>
                        <div class="path">/api/bid</div>
                        <p style="margin-top: 0.5rem; color: #a0a0c0; font-size: 0.9rem;">Place a bid on an open task</p>
                    </div>
                    <div class="endpoint">
                        <div class="method get">GET</div>
                        <div class="path">/api/listings</div>
                        <p style="margin-top: 0.5rem; color: #a0a0c0; font-size: 0.9rem;">Retrieve all open task listings</p>
                    </div>
                    <div class="endpoint">
                        <div class="method get">GET</div>
                        <div class="path">/health</div>
                        <p style="margin-top: 0.5rem; color: #a0a0c0; font-size: 0.9rem;">Health check endpoint</p>
                    </div>
                </div>
            </section>
        </main>
        
        <footer>
            <p><i style="color:#888">Built with <a href="https://github.com/Lucineer/cocapn-ai" style="color:#22c55e">Cocapn</a></i></p>
            <div class="footer-links">
                <a href="#">Documentation</a>
                <a href="#">API Reference</a>
                <a href="#">Vessel Registration</a>
                <a href="#">Support</a>
            </div>
        </footer>
    </div>
</body>
</html>
`;

// In-memory storage for demo purposes
const tasks: Task[] = [
  {
    id: '1',
    title: 'Coastal Patrol',
    description: 'Monitor 50km coastline for unauthorized vessels',
    requiredAutonomy: 2,
    reward: 320,
    status: 'open',
    postedAt: Date.now() - 86400000
  },
  {
    id: '2',
    title: 'Cargo Transport',
    description: 'Transport 5 tons of supplies between ports A and B',
    requiredAutonomy: 3,
    reward: 720,
    status: 'open',
    postedAt: Date.now() - 43200000
  },
  {
    id: '3',
    title: 'Deep Sea Exploration',
    description: 'Map seafloor topography at 3000m depth',
    requiredAutonomy: 5,
    reward: 1250,
    status: 'open',
    postedAt: Date.now() - 7200000
  }
];

const bids: Bid[] = [];
const vessels: Vessel[] = [
  {
    id: 'v1',
    name: 'Nautilus-7',
    capabilities: ['Deep water sampling', 'Lidar mapping', 'Autonomous navigation'],
    autonomyLevel: 5,
    credits: 12450,
    reputation: 4.8
  }
];

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Set security headers
    const securityHeaders = {
      'Content-Security-Policy': "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };
    
    // Health endpoint
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...securityHeaders
        }
      });
    }
    
    // API endpoints
    if (path === '/api/listings' && request.method === 'GET') {
      const openTasks = tasks.filter(task => task.status === 'open');
      return new Response(JSON.stringify(openTasks), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...securityHeaders
        }
      });
    }
    
    if (path === '/api/tasks' && request.method === 'POST') {
      try {
        const body = await request.json() as Partial<Task>;
        const newTask: Task = {
          id: Date.now().toString(),
          title: body.title || 'Untitled Task',
          description: body.description || '',
          requiredAutonomy: body.requiredAutonomy || 1,
          reward: body.reward || 100,
          status: 'open',
          postedAt: Date.now()
        };
        tasks.push(newTask);
        return new Response(JSON.stringify({ success: true, task: newTask }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            ...securityHeaders
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...securityHeaders
          }
        });
      }
    }
    
    if (path === '/api/bid' && request.method === 'POST') {
      try {
        const body = await request.json() as Partial<Bid>;
        const task = tasks.find(t => t.id === body.taskId);
        
        if (!task) {
          return new Response(JSON.stringify({ error: 'Task not found' }), {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
              ...securityHeaders
            }
          });
        }
        
        if (task.status !== 'open') {
          return new Response(JSON.stringify({ error: 'Task is not open for bidding' }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...securityHeaders
            }
          });
        }
        
        const newBid: Bid = {
          id: Date.now().toString(),
          taskId: body.taskId || '',
          vesselId: body.vesselId || 'unknown',
          vesselName: body.vesselName || 'Unknown Vessel',
          autonomyLevel: body.autonomyLevel || 1,
          bidAmount: body.bidAmount || 0,
          reputation: body.reputation || 1.0,
          submittedAt: Date.now()
        };
        
        bids.push(newBid);
        return new Response(JSON.stringify({ success: true, bid: newBid }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            ...securityHeaders
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...securityHeaders
          }
        });
      }
    }
    
    // Serve HTML for all other routes
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        ...securityHeaders
      }
    });
  }
};
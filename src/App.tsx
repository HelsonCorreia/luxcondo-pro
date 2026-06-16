import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { AuthLayout } from './components/layout/AuthLayout'
import { MainLayout } from './components/layout/MainLayout'

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'

// Main Pages
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { CondominiosPage } from './pages/condominios/CondominiosPage'
import { MoradoresPage } from './pages/moradores/MoradoresPage'
import { FinanceiroPage } from './pages/financeiro/FinanceiroPage'
import { CobrancasPage } from './pages/cobrancas/CobrancasPage'
import { OcorrenciasPage } from './pages/ocorrencias/OcorrenciasPage'
import { ManutencaoPage } from './pages/manutencao/ManutencaoPage'
import { AssembleiasPage } from './pages/assembleias/AssembleiasPage'
import { ReservasPage } from './pages/reservas/ReservasPage'
import { VisitantesPage } from './pages/visitantes/VisitantesPage'
import { EncomendasPage } from './pages/encomendas/EncomendasPage'
import { FuncionariosPage } from './pages/funcionarios/FuncionariosPage'
import { PrestadoresPage } from './pages/prestadores/PrestadoresPage'
import { DocumentosPage } from './pages/documentos/DocumentosPage'
import { ComunicacaoPage } from './pages/comunicacao/ComunicacaoPage'
import { PortariaPage } from './pages/portaria/PortariaPage'
import { ConfigPage } from './pages/config/ConfigPage'
import { PortalPage } from './pages/portal/PortalPage'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <Routes>
              {/* Auth routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registar" element={<RegisterPage />} />
                <Route path="/recuperar-senha" element={<ForgotPasswordPage />} />
              </Route>

              {/* Protected routes */}
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/condominios" element={<CondominiosPage />} />
                <Route path="/condominios/:id" element={<CondominiosPage />} />
                <Route path="/moradores" element={<MoradoresPage />} />
                <Route path="/financeiro" element={<FinanceiroPage />} />
                <Route path="/cobrancas" element={<CobrancasPage />} />
                <Route path="/ocorrencias" element={<OcorrenciasPage />} />
                <Route path="/manutencao" element={<ManutencaoPage />} />
                <Route path="/assembleias" element={<AssembleiasPage />} />
                <Route path="/reservas" element={<ReservasPage />} />
                <Route path="/visitantes" element={<VisitantesPage />} />
                <Route path="/encomendas" element={<EncomendasPage />} />
                <Route path="/funcionarios" element={<FuncionariosPage />} />
                <Route path="/prestadores" element={<PrestadoresPage />} />
                <Route path="/documentos" element={<DocumentosPage />} />
                <Route path="/comunicacao" element={<ComunicacaoPage />} />
                <Route path="/portaria" element={<PortariaPage />} />
                <Route path="/config" element={<ConfigPage />} />
                <Route path="/portal" element={<PortalPage />} />
              </Route>

              {/* Redirect to dashboard by default */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

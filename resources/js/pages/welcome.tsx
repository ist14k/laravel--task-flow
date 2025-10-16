import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BarChart3, CheckCircle, Users, Zap } from 'lucide-react';

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Welcome to TaskFlow">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <span className="text-lg font-bold text-white">TF</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                TaskFlow
              </span>
            </div>

            <div className="flex items-center gap-4">
              {auth.user ? (
                <Link
                  href={dashboard()}
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-white transition-shadow hover:shadow-lg"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={login()}
                    className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    href={register()}
                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-white transition-shadow hover:shadow-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white pt-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mb-8 inline-block rounded-full bg-blue-100 px-4 py-1.5 dark:bg-blue-900">
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-200">
              ✨ Welcome to TaskFlow
            </span>
          </div>

          <h1 className="mb-6 text-5xl leading-tight font-bold text-gray-900 lg:text-6xl dark:text-white">
            Manage Your Tasks
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Stay organized, collaborate seamlessly, and achieve your goals with
            TaskFlow. Streamline your workflow and boost productivity today.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {auth.user ? (
              <Link
                href={dashboard()}
                className="transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-white transition-all hover:scale-105 hover:shadow-lg"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link
                  href={register()}
                  className="transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-white transition-all hover:scale-105 hover:shadow-lg"
                >
                  Start Free Now →
                </Link>
                <Link
                  href={login()}
                  className="rounded-lg border-2 border-gray-300 px-8 py-3 text-gray-900 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {/* Feature 1 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Smart Organization
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Organize tasks with boards, lists, and cards. Keep everything in
              one place.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Team Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Invite team members, assign tasks, and collaborate in real-time.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900">
              <Zap className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Lightning Fast
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Optimized performance and real-time updates keep you moving fast.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track progress with detailed insights and performance metrics.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white">
            <h2 className="mb-4 text-4xl font-bold">
              Ready to transform your productivity?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Join thousands of users already managing their tasks with TaskFlow
            </p>
            {!auth.user && (
              <Link
                href={register()}
                className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
              >
                Get Started Free →
              </Link>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>&copy; 2025 TaskFlow. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

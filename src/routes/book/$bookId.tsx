import { createFileRoute } from '@tanstack/react-router'

import { Container } from '#/components/lib/Conatiner';

export const Route = createFileRoute('/book/$bookId')({
  loader: ({ params }) => params.bookId,
  pendingComponent: () => <div>Loading post...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  component: RouteComponent
})

function RouteComponent() {
  const { bookId } = Route.useParams()
  return <Container >Post ID: {bookId}</Container>
}
